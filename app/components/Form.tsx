'use client'
import { FC } from 'react'
import { TextInput } from './TextInput'
import { NumberInput } from './NumberInput'
import { css } from '../../styled-system/css'
import { useForm, zodResolver } from '@mantine/form'
import { RequestSchema, requestSchema } from '../type'
import { stack } from '@/styled-system/patterns'

type Props = {
  onSubmit: (params: RequestSchema) => void
}

export const Form: FC<Props> = ({ onSubmit }) => {
  const form = useForm<RequestSchema>({
    initialValues: {
      question: '',
      correctAnswer: '',
      answer: '',
      maxScore: 0,
    },
    validate: zodResolver(requestSchema),
  })

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className={css({ mx: 'auto' })}>
      <div
        className={stack({
          gap: 4,
        })}
      >
        <TextInput
          label='問題文'
          {...form.getInputProps('question')}
          placeholder='例）アフリカ大陸にある国名を3つ答えよ'
          errorMessage={(form.errors?.question as string) || ''}
        />
        <TextInput
          label='模範解答'
          {...form.getInputProps('correctAnswer')}
          placeholder='例）ニジェール、モーリタニア、ナミビアなど'
          errorMessage={(form.errors?.correctAnswer as string) || ''}
        />
        <NumberInput
          label='配点'
          {...form.getInputProps('maxScore')}
          placeholder='例）6'
          errorMessage={(form.errors?.maxScore as string) || ''}
        />
        <TextInput
          label='採点したい解答'
          {...form.getInputProps('answer')}
          placeholder='例）エジプト、アフガニスタン、シリア'
          errorMessage={(form.errors?.answer as string) || ''}
        />
        <button
          className={css({
            py: '2',
            rounded: '8px',
            cursor: 'pointer',
            background: 'linear-gradient(to right, green, #10c07f, #0938e3)',
            color: 'white',
            font: 'bold',
            _disabled: {
              cursor: 'default',
              bg: '#e9ecef',
              color: '#adb5bd',
            },
          })}
        >
          AI採点
        </button>
      </div>
    </form>
  )
}
