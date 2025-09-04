import { DynamicStructuredTool } from "langchain/tools";

export class N8nTool extends DynamicStructuredTool<any> {
    async _call(input: string, runManager?: any): Promise<any> {
        try {
            const parser = this.schema as any;
            const parsed = await parser.parseAsync(input);
            return this.func(parsed, runManager);
        } catch (err: any) {
            throw new Error(`Tool input parse failed: ${err?.message ?? String(err)}`);
        }
    }
}
