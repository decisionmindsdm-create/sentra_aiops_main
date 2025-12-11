"""
Pega Provider - Monitor and manage alerts from Pega Platform.
"""

import dataclasses
import logging

import pydantic
import requests

from keep.contextmanager.contextmanager import ContextManager
from keep.providers.base.base_provider import BaseProvider
from keep.providers.models.provider_config import ProviderConfig, ProviderScope
from keep.api.models.alert import AlertDto, AlertSeverity, AlertStatus


@pydantic.dataclasses.dataclass
class PegaProviderAuthConfig:
    """
    Pega authentication configuration.
    """
    api_key: str = dataclasses.field(
        metadata={
            "required": True,
            "description": "Pega API Key or Access Token",
            "sensitive": True,
        }
    )
    pega_url: str = dataclasses.field(
        metadata={
            "required": True,
            "description": "Pega Platform URL",
            "hint": "https://your-instance.pega.com",
            "validation": "any_http_url",
        }
    )
    username: str = dataclasses.field(
        default="",
        metadata={
            "required": False,
            "description": "Pega Username (if using basic auth)",
        }
    )


class PegaProvider(BaseProvider):
    """Integrate alerts and cases from Pega Platform into Keep."""

    PROVIDER_DISPLAY_NAME = "Pega"
    PROVIDER_CATEGORY = ["Monitoring", "Business Process", "Case Management"]
    
    # Webhook support
    webhook_description = "Receive alerts and case notifications from Pega"
    webhook_template = ""
    webhook_markdown = """
To send alerts from Pega to Keep, configure the following webhook:

1. Log in to your Pega Platform (Dev Studio)
2. Navigate to **Records** > **Integration-Resources** > **REST Service**
3. Create a new REST service or edit an existing one:
   - **Service URL**: {keep_webhook_api_url}
   - **Method**: POST
   - **Authentication**: Custom Header
   - **Header Name**: X-API-KEY
   - **Header Value**: {api_key}
4. In your case type or flow:
   - Add a **Send REST** shape
   - Configure it to call the webhook service
   - Map case data to the request body
5. Save and test the configuration
"""

    PROVIDER_SCOPES = [
        ProviderScope(
            name="read:cases",
            description="Read cases and alerts from Pega",
            mandatory=True,
            alias="Read Cases",
        ),
        ProviderScope(
            name="read:assignments",
            description="Read work assignments",
            mandatory=False,
            alias="Read Assignments",
        ),
    ]

    FINGERPRINT_FIELDS = ["case_id"]

    def __init__(
        self, context_manager: ContextManager, provider_id: str, config: ProviderConfig
    ):
        super().__init__(context_manager, provider_id, config)

    def validate_config(self):
        """
        Validate the provider configuration.
        """
        self.authentication_config = PegaProviderAuthConfig(
            **self.config.authentication
        )

    def dispose(self):
        """
        Dispose of the provider.
        """
        pass

    def validate_scopes(self) -> dict[str, bool | str]:
        """
        Validate that the API credentials have the required scopes.
        """
        scopes = {}
        
        try:
            # Test connection to Pega API
            headers = {
                "Authorization": f"Bearer {self.authentication_config.api_key}",
                "Content-Type": "application/json",
            }
            
            # Try to access Pega REST API
            url = f"{self.authentication_config.pega_url.rstrip('/')}/api/v1/cases"
            response = requests.get(
                url,
                headers=headers,
                timeout=10,
                verify=True
            )
            
            if response.status_code == 200:
                scopes["read:cases"] = True
                scopes["read:assignments"] = True
            elif response.status_code == 401:
                scopes["read:cases"] = "Unauthorized - check API key"
                scopes["read:assignments"] = "Unauthorized - check API key"
            else:
                scopes["read:cases"] = f"API returned status {response.status_code}"
                scopes["read:assignments"] = True
                
        except requests.exceptions.RequestException as e:
            self.logger.exception("Error validating Pega connection")
            scopes["read:cases"] = f"Connection error: {str(e)}"
            scopes["read:assignments"] = "Not validated"
        except Exception as e:
            self.logger.exception("Error validating scopes")
            scopes["read:cases"] = str(e)
            scopes["read:assignments"] = "Not validated"
        
        return scopes

    @staticmethod
    def _format_alert(
        event: dict, provider_instance: "BaseProvider" = None
    ) -> AlertDto:
        """
        Format an alert from Pega into Keep's AlertDto format.
        
        Args:
            event: The raw alert/case event from Pega
            provider_instance: The provider instance
            
        Returns:
            AlertDto: Formatted alert
        """
        # Extract case/alert details from the event
        case_id = event.get("pzInsKey") or event.get("case_id") or event.get("ID")
        case_type = event.get("pyClassName") or event.get("case_type", "")
        
        # Build alert name
        name = event.get("pyLabel") or event.get("name") or event.get("title", f"Pega Case {case_id}")
        
        description = event.get("pyDescription") or event.get("description") or event.get("message", "")
        
        # Extract severity - Pega uses urgency
        urgency = str(event.get("pyUrgency") or event.get("urgency", "30")).lower()
        severity_map = {
            "10": AlertSeverity.CRITICAL,  # High urgency
            "20": AlertSeverity.HIGH,
            "30": AlertSeverity.WARNING,   # Medium urgency
            "40": AlertSeverity.LOW,
            "50": AlertSeverity.INFO,      # Low urgency
            "critical": AlertSeverity.CRITICAL,
            "high": AlertSeverity.HIGH,
            "medium": AlertSeverity.WARNING,
            "low": AlertSeverity.LOW,
            "info": AlertSeverity.INFO,
        }
        mapped_severity = severity_map.get(urgency, AlertSeverity.INFO)
        
        # Map status - Pega uses pyStatusWork
        status = str(event.get("pyStatusWork") or event.get("status", "Open")).lower()
        status_map = {
            "new": AlertStatus.FIRING,
            "open": AlertStatus.FIRING,
            "pending": AlertStatus.FIRING,
            "resolved": AlertStatus.RESOLVED,
            "closed": AlertStatus.RESOLVED,
            "cancelled": AlertStatus.RESOLVED,
        }
        
        # Check for status in the string
        mapped_status = AlertStatus.FIRING
        for key, value in status_map.items():
            if key in status:
                mapped_status = value
                break
        
        # Create the alert
        alert = AlertDto(
            id=case_id,
            name=name,
            description=description,
            severity=mapped_severity,
            status=mapped_status,
            source=["pega"],
            lastReceived=event.get("pxCreateDateTime") or event.get("timestamp"),
            case_type=case_type,
            **event  # Include all other fields
        )
        
        # Set fingerprint
        alert.fingerprint = BaseProvider.get_alert_fingerprint(
            alert, PegaProvider.FINGERPRINT_FIELDS
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
            "pega_url": "https://your-instance.pega.com",
        }
    }
    
    from keep.providers.providers_factory import ProvidersFactory
    
    provider = ProvidersFactory.get_provider(
        context_manager,
        provider_id="pega-test",
        provider_type="pega",
        provider_config=config,
    )
    
    print("Pega Provider initialized successfully!")
    print(f"Display Name: {provider.PROVIDER_DISPLAY_NAME}")
    print(f"Categories: {provider.PROVIDER_CATEGORY}")
