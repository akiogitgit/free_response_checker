import { FC } from 'react'
import { css } from '../../styled-system/css'

type Props = {
  reason: string
  advice: string
}

export const GptComments: FC<Props> = ({ reason, advice }) => {
  return (
    <div>
      <h2
        className={css({
          fontSize: 'xl',
          borderBottom: '1px solid gray',
        })}
      >
        コメント
      </h2>

      <div
        className={css({
          mt: '2',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        })}
      >
        <p>{reason}</p>
        <p>{advice}</p>
      </div>
    </div>
  )
}
