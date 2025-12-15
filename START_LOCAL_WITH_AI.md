# Starting Keep AIOps Platform Locally with AI Features

## ✅ Configuration Complete!

All AI features are now configured to use your OpenAI API key:
- `sk-svcacct-FJyft...L0AA`

## 🚀 How to Start the Application

### Prerequisites
1. **Python 3.11+** installed
2. **Node.js 18+** and npm installed
3. **PostgreSQL** running (or SQLite for development)
4. **Redis** running (optional, for background tasks)

### Step 1: Start the Backend (FastAPI)

Open a PowerShell terminal in the project root:

```powershell
# Install Python dependencies (first time only)
poetry install

# Start the backend server
poetry run uvicorn keep.api.api:app --reload --host 0.0.0.0 --port 8080
```

**Backend will be available at:** `http://localhost:8080`

**Note:** The `.env` file in the root directory contains your OpenAI API key, which the backend will automatically load.

### Step 2: Start the Frontend (Next.js)

Open a **new** PowerShell terminal and navigate to the `keep-ui` folder:

```powershell
cd keep-ui

# Install Node dependencies (first time only)
npm install

# Start the frontend development server
npm run dev
```

**Frontend will be available at:** `http://localhost:3000`

**Note:** The `keep-ui/.env.local` file contains your OpenAI API key for the frontend.

### Step 3: Access the Application

1. Open your browser to: **http://localhost:3000**
2. The default auth is NO_AUTH, so you can access directly

---

## 🤖 AI Features Now Working

### 1. ✅ AI Incident Assistant (Root Cause Analysis)
**Location:** Incident Details Page → Chat Tab

**How it works:**
- Navigate to any incident with alerts
- Click on the "Chat" tab
- The AI assistant will help you with root cause analysis
- Ask questions like: "Find the root cause of this incident"

**Powered by:** OpenAI via CopilotKit
**Uses:** Your OpenAI API key from `.env.local`

---

### 2. ✅ AI Workflow Builder Assistant (Natural Language)
**Location:** Workflows → Create Workflow → AI Chat Panel

**How it works:**
- Go to Workflows page
- Click "+ Create Workflow"
- Click the sparkle icon to open AI assistant
- Describe your workflow in plain English
  - Example: "For each alert about CPU > 80%, send a slack message to #alerts"

**Powered by:** OpenAI via CopilotKit
**Uses:** Your OpenAI API key from `.env.local`

---

### 3. ✅ AI Semi-Automatic Correlation (Feed)
**Location:** Alerts → Feed → Select Alerts → "Create Incidents With AI"

**How it works:**
1. Go to Alerts → Feed
2. Select multiple alerts (use checkboxes)
3. Click "Create Incidents With AI" button
4. The AI will analyze alerts and suggest incident groupings
5. Review and approve/reject suggested incidents

**Powered by:** OpenAI GPT-4o (backend)
**Uses:** Your OpenAI API key from root `.env`
**Model:** `gpt-4o-2024-08-06` (configurable via `OPENAI_MODEL_NAME`)

---

### 4. ✅ AI in Workflows (OpenAI Provider)
**Location:** Workflows → Add Step/Action → Choose AI Provider

**How it works:**
- Create or edit a workflow
- Add a step or action with provider type: `openai`
- Configure the OpenAI provider with your API key
- Use for: summarization, enrichment, routing, severity detection

**Example workflow:**
```yaml
workflow:
  id: ai-enrichment
  triggers:
    - type: alert
  steps:
    - name: analyze-alert
      provider:
        type: openai
        config: "{{ providers.openai }}"
        with:
          prompt: "Analyze this alert: {{ alert }}"
          model: "gpt-4o-mini"
  actions:
    - name: send-result
      provider:
        type: slack
        with:
          message: "{{ steps.analyze-alert.results }}"
```

**Powered by:** OpenAI Provider (configurable)
**Setup required:** Configure OpenAI provider in Settings → Providers

---

### 5. ⚠️ AI Plugins (External Algorithms)
**Location:** AI → AI Plugins

**Status:** Requires external transformer service

**How it works:**
- AI Plugins use external ML models for correlation
- Not directly using OpenAI (designed for air-gapped environments)
- Requires `KEEP_EXTERNAL_AI_TRANSFORMERS_URL` environment variable

**Note:** This feature uses proprietary/self-hosted models, not OpenAI.

---

## 📋 Environment Variables Summary

### Root `.env` (Backend)
```env
OPENAI_API_KEY=sk-svcacct-FJyft...L0AA
OPEN_AI_API_KEY=sk-svcacct-FJyft...L0AA  # Alternative name for compatibility
OPENAI_MODEL_NAME=gpt-4o-2024-08-06  # Optional: specify model
```

### `keep-ui/.env.local` (Frontend)
```env
OPENAI_API_KEY=sk-svcacct-FJyft...L0AA
OPEN_AI_API_KEY=sk-svcacct-FJyft...L0AA  # Alternative name
NEXT_PUBLIC_OPENAI_API_KEY=sk-svcacct-FJyft...L0AA  # For client-side detection
API_URL=http://localhost:8080
```

---

## 🔧 Troubleshooting

### AI Features Show "AI is disabled"
**Solution:** Make sure both backend and frontend are restarted after updating `.env` files.

```powershell
# Stop both servers (Ctrl+C)
# Then restart them as shown in Steps 1 & 2 above
```

### Backend Can't Find OpenAI Key
**Check:**
1. Ensure `.env` file exists in project root
2. Verify the file contains `OPENAI_API_KEY=sk-svcacct-...`
3. Restart the backend server

### Frontend AI Not Working
**Check:**
1. Ensure `keep-ui/.env.local` contains the OpenAI key
2. Restart the frontend dev server: `npm run dev`
3. Check browser console for errors

### "AI service is unavailable" Error
**Possible causes:**
1. Invalid OpenAI API key
2. OpenAI API rate limits exceeded
3. Network connectivity issues

**Solution:** Verify your API key is valid and has available credits.

---

## 🎯 Quick Test Checklist

- [ ] Backend running on http://localhost:8080
- [ ] Frontend running on http://localhost:3000
- [ ] Can access Keep UI in browser
- [ ] AI Incident Assistant shows chat interface (not "AI is disabled")
- [ ] AI Workflow Builder shows sparkle icon and chat panel
- [ ] "Create Incidents With AI" button appears in Feed
- [ ] Can configure OpenAI provider in Settings → Providers

---

## 📚 Additional Resources

- **Documentation:** https://docs.keephq.dev
- **OpenAI Provider Setup:** https://docs.keephq.dev/providers/documentation/openai-provider
- **Workflow Examples:** `examples/workflows/` folder
- **AI Features Docs:**
  - AI Incident Assistant: `docs/overview/ai-incident-assistant.mdx`
  - AI Workflow Builder: `docs/overview/ai-workflow-assistant.mdx`
  - AI Semi-Automatic Correlation: `docs/overview/ai-semi-automatic-correlation.mdx`
  - AI in Workflows: `docs/overview/ai-in-workflows.mdx`

---

## ✨ All Set!

Your Keep AIOps platform is now configured to use OpenAI for:
1. ✅ AI Incident Assistant
2. ✅ AI Workflow Builder
3. ✅ AI Semi-Automatic Correlation
4. ✅ AI in Workflows (when configured)

**Enjoy your AI-powered alert management! 🚀**
