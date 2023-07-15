import { FC } from 'react'
import { css } from '../../styled-system/css'

type Props = {
  isCorrect: boolean
  score: number
  maxScore: number
}

export const GptResult: FC<Props> = ({ isCorrect, score, maxScore }) => {
  return (
    <div>
      <p
        className={css({
          fontSize: 'xl',
          textAlign: 'center',
        })}
      >
        <span
          className={css({
            fontSize: '2xl',
          })}
        >
          {isCorrect ? '正解' : '不正解'}
        </span>

        <span
          className={css({
            ml: 2,
          })}
        >
          {score} / {maxScore} 点
        </span>
      </p>
    </div>
  )
}
