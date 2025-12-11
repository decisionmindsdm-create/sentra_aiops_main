# N8n Provider

The N8n provider enables integration with n8n workflow automation platform, allowing you to trigger n8n workflows from Keep.

## Authentication Methods

The N8n provider supports two authentication methods:

### 1. Webhook URL (Recommended for simple workflows)
Use this method to trigger n8n workflows via webhook.

**Configuration:**
```yaml
authentication:
  webhook_url: "https://your-n8n-instance.com/webhook/your-webhook-path"
```

### 2. API Key (For advanced workflow management)
Use this method to execute workflows via the n8n API.

**Configuration:**
```yaml
authentication:
  n8n_url: "https://your-n8n-instance.com"
  api_key: "your-n8n-api-key"
```

## Usage Examples

### Example 1: Trigger N8n Workflow via Webhook

```yaml
workflow:
  id: n8n-webhook-example
  name: N8n Webhook Example
  description: Trigger an n8n workflow via webhook
  
  actions:
    - name: trigger-n8n-webhook
      provider:
        type: n8n
        config: "{{ providers.n8n }}"
        with:
          message: "Alert triggered from Keep"
          data:
            alert_name: "High CPU Usage"
            severity: "critical"
            host: "server-01"
            timestamp: "{{ timestamp }}"
```

### Example 2: Execute N8n Workflow via API

```yaml
workflow:
  id: n8n-api-execution
  name: N8n API Execution
  description: Execute an n8n workflow using API
  
  actions:
    - name: execute-workflow
      provider:
        type: n8n
        config: "{{ providers.n8n_api }}"
        with:
          workflow_id: "your-workflow-id"
          data:
            alert_source: "Keep Monitoring"
            environment: "production"
            metrics:
              cpu: 85
              memory: 75
```

## Features

- ✅ Trigger workflows via webhook
- ✅ Execute workflows via API
- ✅ Support for custom data payloads
- ✅ Support for multiple HTTP methods (GET, POST, PUT, DELETE)
- ✅ Flexible authentication options

## Setup in N8n

### For Webhook Method:
1. Create a workflow in n8n
2. Add a "Webhook" node as the trigger
3. Configure the webhook node with your desired path
4. Copy the webhook URL from the node
5. Use this URL in the Keep provider configuration

### For API Method:
1. In your n8n instance, go to Settings → API
2. Generate an API key
3. Copy the API key
4. Use both the n8n instance URL and API key in Keep provider configuration

## Notes

- When using webhook method, the data will be sent as JSON in the request body
- When using API method, you can also retrieve the list of workflows and their execution status
- The provider supports custom headers for both authentication methods
- Default timeout for requests is 30 seconds
