# n8n-nodes-openai-langfuse

> This project is proudly developed and maintained by **Wistron DXLab**. <br><br>
> ⚡Update: This is the new [**n8n-nodes-ai-agent-langfuse**](https://github.com/rorubyy/n8n-nodes-ai-agent-langfuse)
 project, an upgraded version with Agent integration and enhanced structured tracing support.
![new-node-example](https://github.com/rorubyy/n8n-nodes-openai-langfuse/blob/main/assets/new-node-example.png?raw=true)

npm package: [https://www.npmjs.com/package/n8n-nodes-openai-langfuse](https://www.npmjs.com/package/n8n-nodes-openai-langfuse)

## Features

- Support for OpenAI-compatible chat models (e.g., `gpt-4.1-mini`, `gpt-4o`)
- Automatic Langfuse tracing for every request and response
- Custom metadata injection: `sessionId`, `userId`, and structured JSON

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Credentials](#credentials)  <!-- delete if no auth needed -->  
[Operations](#operations)  
[Compatibility](#compatibility)  
[Usage](#usage)  <!-- delete if not using this section -->  
[Resources](#resources)  
[Version history](#version-history)  <!-- delete if not using this section -->  

## Installation
Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the official n8n documentation for community nodes.

### Community Nodes (Recommended)
For **n8n v0.187+**, install directly from the UI:
1. Go to Settings → Community Nodes
2. Click **Install**
3. Enter `n8n-nodes-openai-langfuse` in Enter npm package name
4. Agree to the risks of using community nodes
5. Select Install

### Docker Installation (Recommended for Production)
A preconfigured Docker setup is available in the `docker/` directory:

1. Clone the repository and navigate to the docker/ directory
    ```bash
    git clone https://github.com/rorubyy/n8n-nodes-openai-langfuse.git
    cd n8n-nodes-openai-langfuse/docker
    ```
2. Build the Docker image
    ```bash
    docker build -t n8n-openai-langfuse .
    ```
3. Run the container
    ```bash
    docker run -it -p 5678:5678 n8n-openai-langfuse
    ```
You can now access n8n at http://localhost:5678

### Manual Installation
For a standard installation without Docker:
```bash
# Go to your n8n installation directory
cd ~/.n8n 
# Install the node
npm install n8n-nodes-openai-langfuse
# Restart n8n to apply the node
n8n start
```
## Credential 

This credential is used to:
- Authenticate your OpenAI-compatible LLM endpoint
- Enable Langfuse tracing, by sending structured request/response logs to your Langfuse instance
### OpenAI Settings
|Field Name|Description|Example|
|-----|-----|-----|
|OpenAI API Key|Your API key for accessing the OpenAI-compatible endpoint|`sk-abc123...`|
OpenAI Organization ID|(Optional) Your OpenAI organization ID, if required|`org-xyz789`|
|OpenAI Base URL|Full URL to your OpenAI-compatible endpoint|default: `https://api.openai.com/v1`|
### Langfuse Settings
|Field Name|Description|Example|
|-----|-----|-----|
Langfuse Base URL|The base URL of your Langfuse instance|`https://cloud.langfuse.com` or self-hosted URL|
|Langfuse Public Key *|Langfuse public key used for tracing authentication|`pk-xxx`|
Langfuse Secret Key *|Langfuse secret key used for tracing authentication|`sk-xxx`|

> 🔑 How to find your Langfuse keys: <br>
> Log in to your Langfuse dashboard, then go to: <br>
> Settings → Projects → [Your Project] to retrieve publicKey and secretKey.

### Credential UI Preview
Once filled out, your credential should look like this:

![credentials-example](https://github.com/rorubyy/n8n-nodes-openai-langfuse/blob/main/assets/credential-example.png?raw=true)
✅ After saving the credential, you're ready to use the node and see traces in your Langfuse dashboard.

## Operations

This node lets you inject Langfuse-compatible metadata into your OpenAI requests.  
You can trace every run with context such as `sessionId`, `userId`, and any custom metadata.

---
### Supported Fields

| Field | Type | Description |
|----------|----------|----------|
| `sessionId` | `string` | Logical session ID to group related runs |
| `userId` | `string` | ID representing the end user making the request |
| `metadata` | `object` | Custom JSON object with additional context (e.g., workflowId, env) |

![langfuse-metadata-example](https://github.com/rorubyy/n8n-nodes-openai-langfuse/blob/main/assets/langfuse-metadata-example.png?raw=true)
---
### 🧪 Example Setup
| Input Field | Example Value |
|----------|----------|
| Session ID | `{{$json.sessionId}}`|
| User ID | `test` |	
Custom Metadata (JSON)
```json
{
  "project": "test-project",
  "env": "dev",
  "workflow": "main-flow"
}
```
---
### Visual Example
1. **Node Configuration UI**: This shows a sample n8n workflow using the Langfuse Chat Node.

![node-example](https://github.com/rorubyy/n8n-nodes-openai-langfuse/blob/main/assets/node-example.png?raw=true)

2. **Workflow Setup**: A typical workflow using this node.

![workflow-example](https://github.com/rorubyy/n8n-nodes-openai-langfuse/blob/main/assets/workflow-example.png?raw=true)

3. **Langfuse Trace Output**
Here’s how traces appear inside the Langfuse dashboard.

![langfuse-example](https://github.com/rorubyy/n8n-nodes-openai-langfuse/blob/main/assets/langfuse-example.png?raw=true)


## Compatibility
- Requires n8n version 1.0.0 or later
- Compatible with:
  - OpenAI official API (https://api.openai.com)
  - Any OpenAI-compatible LLM (e.g. via LiteLLM, LocalAI, Azure OpenAI)
  - Langfuse Cloud and self-hosted instances

## Resources

- [n8n Community Node Docs](https://docs.n8n.io/integrations/community-nodes/)
- [Langfuse Documentation](https://docs.langfuse.com/)
- [n8n Community Forum](https://community.n8n.io/)
- [Langfuse GitHub](https://github.com/langfuse/langfuse)

## Version History

- **v1.0** – Initial release with OpenAI + Langfuse integration

## License
MIT © 2025 Wistron DXLab  