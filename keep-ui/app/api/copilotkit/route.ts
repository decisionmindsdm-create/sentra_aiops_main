import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import OpenAI, { OpenAIError } from "openai";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  function initializeCopilotRuntime() {
    try {
      // Support both OPEN_AI_API_KEY and OPENAI_API_KEY for compatibility
      const apiKey = process.env.OPEN_AI_API_KEY || process.env.OPENAI_API_KEY;
      
      console.log("[AI CONFIG DEBUG] OPEN_AI_API_KEY exists:", !!process.env.OPEN_AI_API_KEY);
      console.log("[AI CONFIG DEBUG] OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);
      console.log("[AI CONFIG DEBUG] Final API key loaded:", !!apiKey);
      if (apiKey) {
        console.log("[AI CONFIG DEBUG] API key preview:", apiKey.substring(0, 20) + "...");
      }
      
      if (!apiKey) {
        console.error("No OpenAI API key found in environment variables");
        return null;
      }
      
      const openai = new OpenAI({
        organization: process.env.OPEN_AI_ORGANIZATION_ID,
        apiKey: apiKey,
      });
      const serviceAdapter = new OpenAIAdapter({
        openai,
        ...(process.env.OPENAI_MODEL_NAME
          ? { model: process.env.OPENAI_MODEL_NAME }
          : {}),
      });
      const runtime = new CopilotRuntime();
      return { runtime, serviceAdapter };
    } catch (error) {
      if (error instanceof OpenAIError) {
        console.log("Error connecting to OpenAI", error);
      } else {
        console.error("Error initializing Copilot Runtime", error);
      }
      return null;
    }
  }

  const runtimeOptions = initializeCopilotRuntime();

  if (!runtimeOptions) {
    return new Response("Error initializing Copilot Runtime", { status: 500 });
  }
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime: runtimeOptions.runtime,
    serviceAdapter: runtimeOptions.serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
