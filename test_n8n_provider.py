#!/usr/bin/env python
import sys
sys.path.insert(0, '.')

from keep.providers.providers_factory import ProvidersFactory

# Clear cache
ProvidersFactory._loaded_providers_cache = None

# Get all providers
providers = ProvidersFactory.get_all_providers(ignore_cache_file=True)

# Find n8n
n8n_providers = [p for p in providers if 'n8n' in p.type.lower()]

print(f"Total providers found: {len(providers)}")
print(f"\nN8n provider status:")
if n8n_providers:
    for p in n8n_providers:
        print(f"  ✓ Found: {p.type}")
        print(f"    Display Name: {p.display_name}")
        print(f"    Categories: {p.categories}")
        print(f"    Tags: {p.tags}")
        print(f"    Can notify: {p.can_notify}")
        print(f"    Can query: {p.can_query}")
else:
    print("  ✗ N8n provider NOT found")
    print("\nAvailable providers:")
    for p in sorted(providers, key=lambda x: x.type)[:10]:
        print(f"  - {p.type}")
