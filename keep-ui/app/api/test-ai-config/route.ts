import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ? `${process.env.OPENAI_API_KEY.substring(0, 20)}...${process.env.OPENAI_API_KEY.substring(process.env.OPENAI_API_KEY.length - 10)}` : 'NOT SET',
    OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY ? `${process.env.OPEN_AI_API_KEY.substring(0, 20)}...${process.env.OPEN_AI_API_KEY.substring(process.env.OPEN_AI_API_KEY.length - 10)}` : 'NOT SET',
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY ? 'SET' : 'NOT SET',
    OPENAI_API_KEY_SET: !!(process.env.OPEN_AI_API_KEY || process.env.OPENAI_API_KEY),
    AI_FEATURES_ENABLED: !!(process.env.OPEN_AI_API_KEY || process.env.OPENAI_API_KEY),
    ALL_ENV_KEYS: Object.keys(process.env).filter(k => k.includes('OPENAI') || k.includes('OPEN_AI'))
  };

  return NextResponse.json(config);
}
