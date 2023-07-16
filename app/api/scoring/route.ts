import { GPTResponse, RequestSchema, requestSchema } from '@/app/type'
import { openai } from '@/libs/openai'
import { NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

/**
 * フォームの内容を元にGPTにリクエストする文章を生成する
 * @param {RequestSchema} フォームのリクエストの型
 */
const generatePrompt = (body: RequestSchema) => {
  const { question, correctAnswer, answer, maxScore } = body
  const req = `
  You are an excellent grader.
  
  question:「${question}」
  Model Answer:「${correctAnswer}」
  Please grade the following
  response:「${answer}」
  The output should be a markdown code snippet formatted in the following schema in Japanese:
  \`\`\`json
  {
    isCorrect: boolean, // If [response] is correct as an answer to [question] even if [response] does not contain [model answer], [isCorrect] is set to true.
    score: number, // score of the answer.
    reason: string // reason of the score.
    advice: string, // what should have been included.
  }
  \`\`\`

  NOTES:
  * Be sure to set your score to an integer between 0 and ${maxScore}. Do not include decimals.
  * If it is a misplaced answer, be sure to set score to 0.
  * Be sure to calculate the grade by (the number of [model answer] to [question] containing the [response] of the [model answer] / the number of [response] of the [model answer]) * ${maxScore}
  * If [response] is correct as an answer to [question] even if [response] does not contain [model answer], [isCorrect] is set to true.
  * Please do not include anything other than JSON in your answer.
  * Response must be Japanese
      `
  return req
}

/**
 * GPTのレスポンスに含まれているJSONを抽出して返す
 * @param {string} GPTのレスポンス
 */
const parseGPTResponse = (gptResponse: string): GPTResponse => {
  const regex = /```json([\s\S]*?)```/gm
  const match = regex.exec(gptResponse)

  // JSONがレスポンスに含まれていない
  if (match === null || match?.[1] === null) {
    return {
      isCorrect: false,
      score: 0,
      reason: '',
      advice: '',
    }
  }
  const jsonData: object = JSON.parse(match[1])

  return jsonData as GPTResponse
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

    // model: 'gpt-3.5-turbo'の時
    // openai.createChatCompletionを使う
    const completion3 = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        // GPTの正確を返る
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: generatePrompt(body) },
      ],
      max_tokens: 300,
    })

    return NextResponse.json(
      {
        requestBody: body,
        request: generatePrompt(body),
        result: completion3.data.choices[0].message?.content,
        gptResponse: parseGPTResponse(
          completion3.data.choices[0].message?.content || '',
        ),
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
