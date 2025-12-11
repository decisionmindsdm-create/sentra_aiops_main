"""
N8nProvider is a class that provides integration with n8n workflow automation platform.
"""

import dataclasses
import json
import typing

import pydantic
import requests

from keep.contextmanager.contextmanager import ContextManager
from keep.exceptions.provider_exception import ProviderException
from keep.providers.base.base_provider import BaseProvider
from keep.providers.models.provider_config import ProviderConfig, ProviderScope


@pydantic.dataclasses.dataclass
class N8nProviderAuthConfig:
    """
    N8n authentication configuration.
    """

    n8n_url: typing.Optional[pydantic.AnyHttpUrl] = dataclasses.field(
        metadata={
            "required": False,
            "description": "N8n instance URL",
            "hint": "https://your-n8n-instance.com",
            "validation": "any_http_url",
            "sensitive": False,
        },
        default=None,
    )

    api_key: typing.Optional[str] = dataclasses.field(
        metadata={
            "required": False,
            "description": "N8n API Key",
            "hint": "API key for n8n authentication",
            "sensitive": True,
        },
        default=None,
    )

    webhook_url: typing.Optional[pydantic.AnyHttpUrl] = dataclasses.field(
        metadata={
            "required": False,
            "description": "N8n Webhook URL",
            "hint": "Webhook URL for triggering n8n workflows",
            "validation": "any_http_url",
            "sensitive": False,
        },
        default=None,
    )


class N8NProvider(BaseProvider):
    """Trigger n8n workflows and send data to n8n."""

    PROVIDER_DISPLAY_NAME = "n8n"
    PROVIDER_CATEGORY = ["Orchestration", "Developer Tools"]
    PROVIDER_TAGS = ["messaging", "queue"]

    PROVIDER_SCOPES = [
        ProviderScope(
            name="trigger_workflow",
            description="Trigger n8n workflows via webhook",
            mandatory=True,
            alias="Trigger Workflow",
        )
    ]

    def __init__(
        self, context_manager: ContextManager, provider_id: str, config: ProviderConfig
    ):
        super().__init__(context_manager, provider_id, config)

    def validate_config(self):
        """
        Validates required configuration for n8n provider.
        """
        self.authentication_config = N8nProviderAuthConfig(
            **self.config.authentication
        )

        # Either webhook_url or (n8n_url + api_key) should be provided
        if not self.authentication_config.webhook_url:
            if not self.authentication_config.n8n_url or not self.authentication_config.api_key:
                raise ProviderException(
                    "Either webhook_url or (n8n_url + api_key) must be provided"
                )

    def dispose(self):
        """
        No need to dispose of anything, so just do nothing.
        """
        pass

    def validate_scopes(self) -> dict[str, bool | str]:
        """
        Validate that the provider can trigger workflows.
        """
        scopes = {}
        try:
            if self.authentication_config.webhook_url:
                # Validate webhook URL is accessible
                scopes["trigger_workflow"] = True
            elif self.authentication_config.api_key:
                # Test API connection
                headers = {
                    "X-N8N-API-KEY": self.authentication_config.api_key,
                    "Content-Type": "application/json",
                }
                response = requests.get(
                    f"{self.authentication_config.n8n_url}/api/v1/workflows",
                    headers=headers,
                    timeout=10,
                )
                if response.status_code == 200:
                    scopes["trigger_workflow"] = True
                else:
                    scopes["trigger_workflow"] = f"API validation failed: {response.status_code}"
            else:
                scopes["trigger_workflow"] = "No valid authentication method configured"
        except Exception as e:
            self.logger.exception("Error validating n8n scopes")
            scopes["trigger_workflow"] = str(e)

        return scopes

    def _trigger_webhook(
        self,
        webhook_url: str = None,
        data: dict = None,
        headers: dict = None,
        method: str = "POST",
        **kwargs
    ) -> dict:
        """
        Trigger an n8n workflow via webhook.

        Args:
            webhook_url: The webhook URL to trigger (optional, uses configured URL if not provided)
            data: Data to send to the webhook
            headers: Additional headers to send
            method: HTTP method (GET, POST, PUT, DELETE)

        Returns:
            dict: Response from the webhook
        """
        if webhook_url is None:
            webhook_url = str(self.authentication_config.webhook_url)

        if not webhook_url:
            raise ProviderException("Webhook URL is required")

        if data is None:
            data = {}

        if headers is None:
            headers = {}

        headers.setdefault("Content-Type", "application/json")

        self.logger.info(
            f"Triggering n8n webhook",
            extra={
                "webhook_url": webhook_url,
                "method": method,
                "data_keys": list(data.keys()) if data else [],
            },
        )

        try:
            if method.upper() == "GET":
                response = requests.get(
                    webhook_url,
                    params=data,
                    headers=headers,
                    timeout=30,
                )
            elif method.upper() == "POST":
                response = requests.post(
                    webhook_url,
                    json=data,
                    headers=headers,
                    timeout=30,
                )
            elif method.upper() == "PUT":
                response = requests.put(
                    webhook_url,
                    json=data,
                    headers=headers,
                    timeout=30,
                )
            elif method.upper() == "DELETE":
                response = requests.delete(
                    webhook_url,
                    json=data,
                    headers=headers,
                    timeout=30,
                )
            else:
                raise ProviderException(f"Unsupported HTTP method: {method}")

            response.raise_for_status()

            try:
                result = response.json()
            except json.JSONDecodeError:
                result = {"text": response.text}

            self.logger.info(
                "Successfully triggered n8n webhook",
                extra={
                    "status_code": response.status_code,
                },
            )

            return {
                "status_code": response.status_code,
                "response": result,
                "success": True,
            }

        except requests.exceptions.RequestException as e:
            self.logger.error(
                f"Failed to trigger n8n webhook: {str(e)}",
                extra={
                    "webhook_url": webhook_url,
                    "error": str(e),
                },
            )
            raise ProviderException(f"Failed to trigger n8n webhook: {str(e)}")

    def _get_workflows(self) -> list[dict]:
        """
        Get list of workflows from n8n API.

        Returns:
            list: List of workflows
        """
        if not self.authentication_config.api_key:
            raise ProviderException("API key is required to get workflows")

        headers = {
            "X-N8N-API-KEY": self.authentication_config.api_key,
            "Content-Type": "application/json",
        }

        try:
            response = requests.get(
                f"{self.authentication_config.n8n_url}/api/v1/workflows",
                headers=headers,
                timeout=10,
            )
            response.raise_for_status()
            workflows = response.json()

            self.logger.info(f"Retrieved {len(workflows.get('data', []))} workflows from n8n")
            return workflows.get("data", [])

        except requests.exceptions.RequestException as e:
            self.logger.error(f"Failed to get workflows: {str(e)}")
            raise ProviderException(f"Failed to get workflows: {str(e)}")

    def _execute_workflow(
        self,
        workflow_id: str,
        data: dict = None,
        **kwargs
    ) -> dict:
        """
        Execute an n8n workflow via API.

        Args:
            workflow_id: The ID of the workflow to execute
            data: Data to pass to the workflow

        Returns:
            dict: Execution result
        """
        if not self.authentication_config.api_key:
            raise ProviderException("API key is required to execute workflows")

        if data is None:
            data = {}

        headers = {
            "X-N8N-API-KEY": self.authentication_config.api_key,
            "Content-Type": "application/json",
        }

        self.logger.info(
            f"Executing n8n workflow",
            extra={
                "workflow_id": workflow_id,
                "data_keys": list(data.keys()) if data else [],
            },
        )

        try:
            response = requests.post(
                f"{self.authentication_config.n8n_url}/api/v1/workflows/{workflow_id}/execute",
                json=data,
                headers=headers,
                timeout=30,
            )
            response.raise_for_status()
            result = response.json()

            self.logger.info(
                "Successfully executed n8n workflow",
                extra={
                    "workflow_id": workflow_id,
                    "execution_id": result.get("data", {}).get("id"),
                },
            )

            return {
                "success": True,
                "execution_id": result.get("data", {}).get("id"),
                "response": result,
            }

        except requests.exceptions.RequestException as e:
            self.logger.error(
                f"Failed to execute workflow: {str(e)}",
                extra={
                    "workflow_id": workflow_id,
                    "error": str(e),
                },
            )
            raise ProviderException(f"Failed to execute workflow: {str(e)}")

    def _notify(
        self,
        message: str = "",
        workflow_id: str = "",
        webhook_url: str = "",
        data: dict = None,
        headers: dict = None,
        method: str = "POST",
        **kwargs: dict,
    ):
        """
        Notify n8n by triggering a workflow.

        Args:
            message: Message to send
            workflow_id: Workflow ID to execute (requires API key)
            webhook_url: Webhook URL to trigger (optional)
            data: Additional data to send
            headers: Additional headers
            method: HTTP method for webhook trigger
        """
        if data is None:
            data = {}

        # Add message to data if provided
        if message:
            data["message"] = message

        # If workflow_id is provided, use API execution
        if workflow_id:
            return self._execute_workflow(workflow_id=workflow_id, data=data, **kwargs)
        # Otherwise, use webhook
        else:
            return self._trigger_webhook(
                webhook_url=webhook_url,
                data=data,
                headers=headers,
                method=method,
                **kwargs
            )

    def _query(
        self,
        workflow_id: str = "",
        webhook_url: str = "",
        data: dict = None,
        method: str = "POST",
        **kwargs: dict,
    ):
        """
        Query n8n workflows.

        Args:
            workflow_id: Workflow ID to execute
            webhook_url: Webhook URL to trigger
            data: Data to send
            method: HTTP method
        """
        if workflow_id:
            return self._execute_workflow(workflow_id=workflow_id, data=data, **kwargs)
        elif webhook_url or self.authentication_config.webhook_url:
            return self._trigger_webhook(
                webhook_url=webhook_url,
                data=data,
                method=method,
                **kwargs
            )
        else:
            raise ProviderException("Either workflow_id or webhook_url is required")


if __name__ == "__main__":
    # Output debug messages
    import logging
    import os

    logging.basicConfig(level=logging.DEBUG, handlers=[logging.StreamHandler()])
    context_manager = ContextManager(
        tenant_id="singletenant",
        workflow_id="test",
    )

    # Load environment variables
    n8n_url = os.environ.get("N8N_URL")
    api_key = os.environ.get("N8N_API_KEY")
    webhook_url = os.environ.get("N8N_WEBHOOK_URL")

    if not webhook_url and (not n8n_url or not api_key):
        raise Exception("Either N8N_WEBHOOK_URL or (N8N_URL and N8N_API_KEY) are required")

    # Initialize the provider and provider config
    config = ProviderConfig(
        description="N8n Provider",
        authentication={
            "n8n_url": n8n_url,
            "api_key": api_key,
            "webhook_url": webhook_url,
        },
    )

    provider = N8NProvider(
        context_manager, provider_id="n8n-test", config=config
    )

    # Test webhook trigger
    if webhook_url:
        print("Testing webhook trigger...")
        result = provider.notify(
            message="Test message from Keep",
            data={
                "alert": "Test alert",
                "severity": "high",
                "timestamp": "2024-01-01T00:00:00Z",
            },
        )
        print(f"Webhook result: {result}")

    # Test workflow execution
    if api_key and n8n_url:
        print("\nTesting API integration...")
        workflows = provider._get_workflows()
        print(f"Found {len(workflows)} workflows")
