'use client'
import { css } from '../styled-system/css'
import { TextInput } from './components/TextInput'
import { useForm, zodResolver } from '@mantine/form'
import { useCallback, useState } from 'react'
import { NumberInput } from './components/NumberInput'
import axios from 'axios'
import { GPTResponse, RequestSchema, requestSchema } from './type'

export default function Home() {
  // Responseの型にする
  const [gptResponse, setGPTResponse] = useState<GPTResponse>()
  const [errorMessage, setErrorMessage] = useState('')
  const form = useForm<RequestSchema>({
    initialValues: {
      question: 'チンパンジーの特徴を述べろ',
      correctAnswer: 'すごい、やばい、こわい',
      answer: '頭がいいよね',
      maxScore: 6,
    },
    validate: zodResolver(requestSchema),
  })

  const onSubmit = useCallback(async (params: RequestSchema) => {
    try {
      requestSchema.parse(params)
      const { data } = await axios.post<{ gptResponse: GPTResponse }>(
        '/api/scoring',
        params,
      )
      // const { data } = await axios.post('/api/scoring', { aaa: 'こんにちは' })

      console.log(data)
      setGPTResponse(data.gptResponse)
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message)
        console.log('error: ', e.message)
      }
    }
  }, [])

  return (
    <>
      <div
        className={css({
          maxW: 500,
          mx: 'auto',
          px: '4',
          mt: '4',
        })}
      >
        <h1
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
            textAlign: 'center',
          })}
        >
          Free Response Checker
        </h1>

        <div
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
            color: 'red.400',
          })}
        >
          Hello 🐼!
        </div>
        <p>
          Free Response
          Checkerは、回答が記述式の問題を、AIで正誤判定するアプリケーションです。
          AIが採点してくれるので問題の採点に役立ちます。
        </p>
        <p>まずはあなたの考えた問題文、模範解答を入力しましょう。</p>
        <p>次に判定したい回答を入力します。</p>
        <p>判定ボタンを押すとAIが正誤判定を行ってくれます。</p>

        <form
          onSubmit={form.onSubmit(onSubmit)}
          className={css({ mx: 'auto' })}
        >
          <div
            className={css({
              mt: '4',
              display: 'flex',
              flexDirection: 'column',
              gap: '3',
            })}
          >
            <TextInput
              label='問題文'
              {...form.getInputProps('question')}
              errorMessage={(form.errors?.question as string) || ''}
            />
            <TextInput
              label='模範解答'
              {...form.getInputProps('correctAnswer')}
              errorMessage={(form.errors?.correctAnswer as string) || ''}
            />
            <NumberInput
              label='配点'
              {...form.getInputProps('maxScore')}
              errorMessage={(form.errors?.maxScore as string) || ''}
            />
            <TextInput
              label='採点したい解答'
              {...form.getInputProps('answer')}
              errorMessage={(form.errors?.answer as string) || ''}
            />
            <button
              className={css({
                py: '2',
                bg: 'blue',
                color: 'white',
                rounded: '8px',
                cursor: 'pointer',
              })}
            >
              送信
            </button>
          </div>
        </form>
        <h2
          className={css({
            fontSize: 'xl',
            mt: '4',
          })}
        >
          結果
        </h2>
        {gptResponse ? (
          <ul>
            <li>isCorrect: {gptResponse.isCorrect ? 'true' : 'false'}</li>
            <li>score: {gptResponse.score}</li>
            <li>reason: {gptResponse.reason}</li>
            <li>advice: {gptResponse.advice}</li>
          </ul>
        ) : null}
        {errorMessage ? errorMessage : null}
      </div>
    </>
  )
}
