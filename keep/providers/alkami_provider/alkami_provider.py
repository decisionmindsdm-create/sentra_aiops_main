"""
Alkami Provider - Monitor and manage alerts from Alkami.
"""

import dataclasses
import logging

import pydantic

from keep.contextmanager.contextmanager import ContextManager
from keep.providers.base.base_provider import BaseProvider
from keep.providers.models.provider_config import ProviderConfig, ProviderScope
from keep.api.models.alert import AlertDto, AlertSeverity, AlertStatus


@pydantic.dataclasses.dataclass
class AlkamiProviderAuthConfig:
    """
    Alkami authentication configuration.
    """
    api_key: str = dataclasses.field(
        metadata={
            "required": True,
            "description": "Alkami API Key",
            "sensitive": True,
        }
    )
    api_url: str = dataclasses.field(
        metadata={
            "required": True,
            "description": "Alkami API URL",
            "hint": "https://api.alkami.com",
            "validation": "any_http_url",
        },
        default="https://api.alkami.com"
    )


class AlkamiProvider(BaseProvider):
    """Integrate alerts from Alkami into Keep."""

    PROVIDER_DISPLAY_NAME = "Alkami"
    PROVIDER_CATEGORY = ["Monitoring", "Banking"]
    
    # Webhook support
    webhook_description = "Receive alerts from Alkami"
    webhook_template = ""
    webhook_markdown = """
To send alerts from Alkami to Keep, configure the following webhook:

1. Log in to your Alkami admin console
2. Go to Alert Settings or Notification Channels
3. Add a new webhook with:
   - **Webhook URL**: {keep_webhook_api_url}
   - **Authentication**: Use HTTP Header
   - **Header Name**: X-API-KEY
   - **Header Value**: {api_key}
4. Save the configuration
"""

    PROVIDER_SCOPES = [
        ProviderScope(
            name="read:alerts",
            description="Read alerts from Alkami",
            mandatory=True,
            alias="Read Alerts",
        ),
    ]

    FINGERPRINT_FIELDS = ["alert_id"]

    def __init__(
        self, context_manager: ContextManager, provider_id: str, config: ProviderConfig
    ):
        super().__init__(context_manager, provider_id, config)

    def validate_config(self):
        """
        Validate the provider configuration.
        """
        self.authentication_config = AlkamiProviderAuthConfig(
            **self.config.authentication
        )

    def dispose(self):
        """
        Dispose of the provider.
        """
        pass

    def validate_scopes(self) -> dict[str, bool | str]:
        """
        Validate that the API key has the required scopes.
        """
        scopes = {}
        try:
            # Add validation logic here when API is available
            # For now, we'll just mark it as valid
            scopes["read:alerts"] = True
        except Exception as e:
            self.logger.exception("Error validating scopes")
            scopes["read:alerts"] = str(e)
        
        return scopes

    @staticmethod
    def _format_alert(
        event: dict, provider_instance: "BaseProvider" = None
    ) -> AlertDto:
        """
        Format an alert from Alkami into Keep's AlertDto format.
        
        Args:
            event: The raw alert event from Alkami
            provider_instance: The provider instance
            
        Returns:
            AlertDto: Formatted alert
        """
        # Extract alert details from the event
        alert_id = event.get("id") or event.get("alert_id")
        name = event.get("name") or event.get("title", "Alkami Alert")
        description = event.get("description") or event.get("message", "")
        severity = event.get("severity", "info").lower()
        status = event.get("status", "firing").lower()
        
        # Map severity
        severity_map = {
            "critical": AlertSeverity.CRITICAL,
            "high": AlertSeverity.HIGH,
            "warning": AlertSeverity.WARNING,
            "medium": AlertSeverity.WARNING,
            "low": AlertSeverity.LOW,
            "info": AlertSeverity.INFO,
        }
        mapped_severity = severity_map.get(severity, AlertSeverity.INFO)
        
        # Map status
        status_map = {
            "firing": AlertStatus.FIRING,
            "resolved": AlertStatus.RESOLVED,
            "acknowledged": AlertStatus.ACKNOWLEDGED,
        }
        mapped_status = status_map.get(status, AlertStatus.FIRING)
        
        # Create the alert
        alert = AlertDto(
            id=alert_id,
            name=name,
            description=description,
            severity=mapped_severity,
            status=mapped_status,
            source=["alkami"],
            lastReceived=event.get("timestamp"),
            **event  # Include all other fields
        )
        
        # Set fingerprint
        alert.fingerprint = BaseProvider.get_alert_fingerprint(
            alert, AlkamiProvider.FINGERPRINT_FIELDS
        )
        
        return alert


if __name__ == "__main__":
    # Test the provider
    logging.basicConfig(level=logging.DEBUG, handlers=[logging.StreamHandler()])
    context_manager = ContextManager(
        tenant_id="singletenant",
        workflow_id="test",
    )
    
    config = {
        "authentication": {
            "api_key": "test-api-key",
            "api_url": "https://api.alkami.com",
        }
    }
    
    from keep.providers.providers_factory import ProvidersFactory
    
    provider = ProvidersFactory.get_provider(
        context_manager,
        provider_id="alkami-test",
        provider_type="alkami",
        provider_config=config,
    )
    
    print("Alkami Provider initialized successfully!")
    print(f"Scopes: {provider.validate_scopes()}")
