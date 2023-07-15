import { FC } from 'react'
import { css } from '../../styled-system/css'
import { stack } from '@/styled-system/patterns'

export const Troubleshooting: FC = () => {
  return (
    <div>
      <h2
        className={css({
          fontSize: 'xl',
          borderBottom: '1px solid gray',
        })}
      >
        採点がおかしい時
      </h2>
      <ul
        className={stack({
          mt: 2,
          gap: 2,
        })}
      >
        <li>再度AI採点をする</li>
        <li>採点がまばらにならないような問題文にする</li>
        <li>
          問題文として正解になる解答を狭める (例：
          ○○を3つ答えよ、○○を△△と比較して答えよ)
        </li>
        <li>
          模範解答以外の答えも含めたい時は、「○○、△△、✕✕など」と書くと狙った採点が出来る時があります。
        </li>
      </ul>
    </div>
  )
}
