import { FC } from 'react'
import { css } from '../../styled-system/css'
import { stack } from '@/styled-system/patterns'

export const AboutScoring: FC = () => {
  return (
    <div>
      <h2
        className={css({
          fontSize: 'xl',
          borderBottom: '1px solid gray',
        })}
      >
        採点について
      </h2>
      <ul
        className={stack({
          mt: 2,
          gap: 2,
        })}
      >
        <li>正解か不正解は、問題文と解答を元に判定します</li>
        <li>配点は要点を含んでいる数を元に計算しています</li>
      </ul>
    </div>
  )
}
