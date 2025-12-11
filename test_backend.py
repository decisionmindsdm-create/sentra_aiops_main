#!/usr/bin/env python
import sys
sys.path.insert(0, '.')

from keep.providers.providers_factory import ProvidersFactory

# Clear cache
ProvidersFactory._loaded_providers_cache = None

# Get all providers
providers = ProvidersFactory.get_all_providers(ignore_cache_file=True)

# Find n8n
n8n_providers = [p for p in providers if p.type == 'n8n']

print(f"Total providers: {len(providers)}")
print(f"\nN8n provider status: {'✓ FOUND' if n8n_providers else '✗ NOT FOUND'}")

if n8n_providers:
    p = n8n_providers[0]
    print(f"  Type: {p.type}")
    print(f"  Display Name: {p.display_name}")
    print(f"  Categories: {p.categories}")
    print(f"  Tags: {p.tags}")
    print(f"  Can Notify: {p.can_notify}")
    print(f"  Can Query: {p.can_query}")
else:
    print("\n⚠️ ERROR: N8n provider not loaded!")
    print("\nFirst 10 providers loaded:")
    for p in sorted(providers, key=lambda x: x.type)[:10]:
        print(f"  - {p.type}")
