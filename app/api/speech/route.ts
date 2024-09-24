import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 10000
})

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const message = searchParams.get('message')
  if (!message) return new Response('Missing message', { status: 400 })
  const audio = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'fable',
    input: message
  })
  return new NextResponse(Buffer.from(await audio.arrayBuffer()), {
    headers: {
      'Content-Type': 'audio/mp3'
    }
  })
}
