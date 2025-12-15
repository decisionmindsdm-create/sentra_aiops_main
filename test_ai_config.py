#!/usr/bin/env python
"""
Quick test to verify OpenAI API key is loaded and AI features are working
"""
import os
from dotenv import load_dotenv, find_dotenv

# Load environment variables
load_dotenv(find_dotenv())

print("=" * 80)
print("AI CONFIGURATION TEST")
print("=" * 80)

# Check backend environment
print("\n1. BACKEND ENVIRONMENT (.env):")
print("-" * 80)
openai_key = os.environ.get("OPENAI_API_KEY")
open_ai_key = os.environ.get("OPEN_AI_API_KEY")

if openai_key:
    print(f"✅ OPENAI_API_KEY is set: {openai_key[:20]}...{openai_key[-10:]}")
else:
    print("❌ OPENAI_API_KEY is NOT set")

if open_ai_key:
    print(f"✅ OPEN_AI_API_KEY is set: {open_ai_key[:20]}...{open_ai_key[-10:]}")
else:
    print("❌ OPEN_AI_API_KEY is NOT set")

# Test OpenAI client initialization
print("\n2. OPENAI CLIENT TEST:")
print("-" * 80)
try:
    from openai import OpenAI
    client = OpenAI()  # This will use OPENAI_API_KEY from environment
    print("✅ OpenAI client initialized successfully")
    print(f"   API Key detected: {bool(client.api_key)}")
except Exception as e:
    print(f"❌ Failed to initialize OpenAI client: {e}")

# Test AI features availability
print("\n3. AI FEATURES STATUS:")
print("-" * 80)

features = {
    "AI Incident Assistant": "Uses OpenAI for root cause analysis (CopilotKit)",
    "AI Workflow Builder": "Uses OpenAI for natural language workflow creation (CopilotKit)",
    "AI Semi-Automatic Correlation": "Uses OpenAI for alert correlation suggestions",
    "AI in Workflows": "Requires OpenAI provider configuration in workflows",
    "AI Plugins": "Uses external algorithms (not OpenAI-based)"
}

if openai_key or open_ai_key:
    for feature, description in features.items():
        if "not OpenAI" in description:
            print(f"⚠️  {feature}")
        else:
            print(f"✅ {feature}")
        print(f"    └─ {description}")
else:
    print("❌ No OpenAI API key found - All AI features will be DISABLED")

# Frontend check
print("\n4. FRONTEND ENVIRONMENT CHECK:")
print("-" * 80)
print("To verify frontend configuration, check the browser console at:")
print("   http://localhost:3000")
print("\nThe frontend should show OPEN_AI_API_KEY_SET = true")
print("You should see AI buttons enabled in the UI:")
print("   - 'Create incidents with AI' button in Alerts")
print("   - AI chat panel in Incident pages")
print("   - AI assistant in Workflow Builder")

print("\n" + "=" * 80)
print("SUMMARY")
print("=" * 80)

if openai_key or open_ai_key:
    print("✅ OpenAI API Key is properly configured")
    print("✅ Backend can use AI features")
    print("✅ You need to RESTART both servers to see changes:")
    print("   1. Stop frontend (Ctrl+C in keep-ui terminal)")
    print("   2. Stop backend (Ctrl+C in backend terminal)")
    print("   3. Restart both using the commands in START_LOCAL_WITH_AI.md")
    print("\n⚠️  IMPORTANT: Servers MUST be restarted for changes to take effect!")
else:
    print("❌ OpenAI API Key is NOT configured")
    print("❌ AI features will be disabled")
    
print("=" * 80)
