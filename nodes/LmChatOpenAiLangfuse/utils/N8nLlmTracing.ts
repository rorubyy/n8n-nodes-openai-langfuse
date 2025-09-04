import { BaseCallbackHandler } from "@langchain/core/callbacks/base";
import type { Serialized } from "@langchain/core/load/serializable";
import type { BaseMessage } from "@langchain/core/messages";
import type { LLMResult } from "@langchain/core/outputs";
import {
    type ISupplyDataFunctions,
    type IExecuteFunctions,
    type IDataObject,
    NodeOperationError,
    type JsonObject,
} from "n8n-workflow";
import { logAiEvent } from "./helpers";

type RunDetail = {
    index: number;
    messages: BaseMessage[] | string[] | string;
    options: any;
};

export class N8nLlmTracing extends BaseCallbackHandler {
    name = "N8nLlmTracing";
    awaitHandlers = true;

    connectionType = 'ai_languageModel';
    #parentRunIndex?: number;
    runsMap: Record<string, RunDetail> = {};

    constructor(private executionFunctions: ISupplyDataFunctions | IExecuteFunctions) {
        super();
    }

    async handleLLMStart(llm: Serialized, prompts: string[], runId: string) {
        const sourceNodeRunIndex =
            this.#parentRunIndex !== undefined
                ? this.#parentRunIndex + (this.executionFunctions as any).getNextRunIndex?.()
                : undefined;

        const options = llm.type === "constructor" ? llm.kwargs : llm;
        const { index } = (this.executionFunctions as any).addInputData(
            this.connectionType,
            [[{ json: { messages: prompts, options } }]],
            sourceNodeRunIndex,
        );

        this.runsMap[runId] = {
            index,
            options,
            messages: prompts,
        };
    }

    async handleLLMEnd(output: LLMResult, runId: string) {
        const runDetails = this.runsMap[runId] ?? { index: 0, options: {}, messages: [] };

        const response = { response: { generations: output.generations } };

        const sourceNodeRunIndex =
            this.#parentRunIndex !== undefined ? this.#parentRunIndex + runDetails.index : undefined;

        (this.executionFunctions as any).addOutputData(
            this.connectionType,
            runDetails.index,
            [[{ json: response }]],
            undefined,
            sourceNodeRunIndex,
        );

        logAiEvent(this.executionFunctions, "ai-llm-generated-output", {
            messages: runDetails.messages,
            options: runDetails.options,
            response,
        });
    }

    async handleLLMError(error: IDataObject | Error, runId: string, parentRunId?: string) {
        const runDetails = this.runsMap[runId] ?? { index: 0, options: {}, messages: [] };

        (this.executionFunctions as any).addOutputData(
            this.connectionType,
            runDetails.index,
            new NodeOperationError((this.executionFunctions as any).getNode(), error as JsonObject, {
                functionality: "configuration-node",
            }),
        );

        logAiEvent(this.executionFunctions, "ai-llm-errored", {
            error: (error as any)?.message ?? String(error),
            runId,
            parentRunId,
        });
    }

    setParentRunIndex(runIndex: number) {
        this.#parentRunIndex = runIndex;
    }
}
