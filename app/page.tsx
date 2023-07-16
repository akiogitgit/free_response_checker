'use client'
import { css } from '../styled-system/css'
import { useCallback, useMemo, useState } from 'react'
import axios from 'axios'
import { GPTResponse, RequestSchema, requestSchema } from './type'
import { Form } from './components/Form'
import { center, stack } from '../styled-system/patterns'
import { AboutScoring } from './components/AboutScoring'
import { GptComments } from './components/GptComments'
import { GptResult } from './components/GptResult'
import { Troubleshooting } from './components/Troubleshooting'
import { Header } from './components/Header'

export default function Home() {
  const [gptResponse, setGPTResponse] = useState<GPTResponse>()
  const [isLoading, setIsLoading] = useState(false)
  const [maxScore, setMaxScore] = useState(0)
  const isCorrectResponse = useMemo(
    () => gptResponse?.score || gptResponse?.reason || gptResponse?.advice,
    [gptResponse?.advice, gptResponse?.reason, gptResponse?.score],
  )

  const onSubmit = useCallback(async (params: RequestSchema) => {
    setIsLoading(true)
    setMaxScore(params.maxScore)
    try {
      requestSchema.parse(params)
      const { data } = await axios.post<{ gptResponse: GPTResponse }>(
        '/api/scoring',
        params,
      )

      console.log(data)
      setGPTResponse(data.gptResponse)
    } catch (e) {
      if (e instanceof Error) {
        console.log('error: ', e.message)
      }
    }
    setIsLoading(false)
  }, [])

  return (
    <>
      <Header />

      <div
        className={css({
          mt: 8,
        })}
      >
        <Form onSubmit={onSubmit} />
      </div>

      {isLoading ? (
        <div
          className={center({
            mt: 8,
          })}
        >
          採点中...
        </div>
      ) : null}

      {gptResponse && !isCorrectResponse && !isLoading ? (
        <div
          className={center({
            mt: 8,
          })}
        >
          結果が返ってきませんでした。再度実行して下さい
        </div>
      ) : null}

      {gptResponse && isCorrectResponse && !isLoading ? (
        <div
          className={stack({
            mt: 8,
            gap: 8,
          })}
        >
          <GptResult
            isCorrect={gptResponse.isCorrect}
            score={gptResponse.score}
            maxScore={maxScore}
          />

          <GptComments
            reason={gptResponse.reason}
            advice={gptResponse.advice}
          />

          <AboutScoring />

          <Troubleshooting />
        </div>
      ) : null}
    </>
  )
}
