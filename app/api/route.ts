import { openai } from '@/libs/openai'
import { NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function GET() {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        result: 'Missing env var from OpenAI',
      },
      { status: 400 },
    )
  }

  try {
    const completion3 = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: '国名を3つ教えて' }],
    })

    return NextResponse.json(
      {
        result: completion3.data.choices[0].message?.content,
      },
      { status: 200 },
    )
  } catch (e) {
    if (e instanceof Error)
      return NextResponse.json(
        {
          result: `catch error: ${e.message}`,
        },
        { status: 400 },
      )
    return NextResponse.json(
      {
        result: `Invalid request: ${JSON.stringify(e)}`,
      },
      { status: 400 },
    )
  }
}
