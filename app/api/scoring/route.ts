import { RequestSchema, requestSchema } from '@/libs/schema'
import { openai } from '@/libs/openai'
import { NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

const generatePrompt = (body: RequestSchema) => {
  const { question, correctAnswer, answer, maxScore } = body
  const req = `
  You are an excellent grader.
  The output should be a markdown code snippet formatted in the following schema in Japanese:
  \`\`\`json
  {
    isCorrect: boolean, // correct or incorrect.
    score: number, // score of the answer.
    reason: string // reason of the score.
    advice: string, // what should have been included.
  }
  \`\`\`
  NOTES:
  * Be sure to set your score to an integer between 0 and ${maxScore}. Do not include decimals.
  * If it is a misplaced answer, be sure to set score to 0.
  * Please do not include anything other than JSON in your answer.
  * Response must be Japanese
  問題：「${question}」
  模範解答：「${correctAnswer}」
  採点は (問題の回答として正しくて、模範解答の要点を含んでいる個数 / 模範解答の要点の数) * ${maxScore} の計算結果として下さい
  以下を採点をして下さい
  解答：「${answer}」
      `
  return req
}
export async function aPOST(request: Request) {
  try {
    const body = await request.json()
    requestSchema.parse(body)

    // const completion = await openai.createCompletion({
    //   model: 'text-davinci-003',
    //   // model: 'text-curie-001',
    //   // model: 'text-babbage-001',
    //   prompt: 'あんぱんとは？',
    //   temperature: 0.6,
    //   max_tokens: 300,
    // })

    // return NextResponse.json({ data: generatePrompt(body) }, { status: 200 })
    return NextResponse.json(
      {
        data: body,
        // data: completion,
        // data1: completion.data,
        // data2: completion.data.choices[0],
        // data3: completion.data.choices[0].text,
        // data4: completion.data.choices[0].text?.split('\n\n'),
      },
      { status: 200 },
    )
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ data: e.message }, { status: 400 })
    }
  }
}

export async function POST(request: Request, res: NextApiResponse) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        result: 'Missing env var from OpenAI',
      },
      { status: 422 },
    )
  }

  const body = await request.json()

  try {
    requestSchema.parse(body)

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      // model: 'text-curie-001',
      // model: 'text-babbage-001',
      prompt: 'あいうえの次は？',
      temperature: 0.6,
      max_tokens: 300,
    })

    return NextResponse.json(
      {
        result: completion.data.choices[0].text
          ?.split('\n\n')
          .slice(1)
          .join('\n\n'),
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
// export async function POST(request: Request) {
//   try {
//     const body = await request.json()
//     // requestSchema.parse(body)
//     const prompt = generatePrompt(body)
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//     const posts = await res.json()
//     return NextResponse.json({ body, prompt, posts }, { status: 200 })
//   } catch (e) {
//     if (e instanceof Error) {
//       return NextResponse.json({ data: e.message }, { status: 411 })
//     }
//     if (e instanceof ZodError) {
//       return NextResponse.json({ data: e.message }, { status: 423 })
//     }
//   }
// }
