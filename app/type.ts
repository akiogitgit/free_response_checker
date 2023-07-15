import { z } from 'zod'

export const requestSchema = z.object({
  question: z
    .string()
    .nonempty('問題は必須です')
    .max(255, '255文字以内で入力して下さい'),
  correctAnswer: z
    .string()
    .nonempty('模範解答は必須です')
    .max(255, '255文字以内で入力して下さい'),
  answer: z
    .string()
    .nonempty('解答は必須です')
    .max(255, '255文字以内で入力して下さい'),
  maxScore: z
    .number({
      required_error: '配点は必須です',
      invalid_type_error: '数字を入力して下さい',
    })
    .min(1, '配点は0以上にして下さい'),
  // level: z.string(),
})

export type RequestSchema = z.infer<typeof requestSchema>

/**
 * GPTのレスポンスから必要なJSONだけを抜き出した時の型
 */
export type GPTResponse = {
  /**
   * 正解か不正解か
   */
  isCorrect: boolean
  /**
   * 解答の得点
   */
  score: number
  /**
   * 得点の理由
   */
  reason: string
  /**
   * より高い得点にする助言
   */
  advice: string
}
