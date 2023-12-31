import { FC } from 'react'
import { css } from '../../styled-system/css'
import { stack } from '@/styled-system/patterns'
import { Block } from './base/Block'

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
        <li>問題文として正解になる解答を狭める</li>
        <li>
          <Block>
            (例)
            <br />
            問題： 「○○を3つ答えよ」、「○○を△△と比較して答えよ」
          </Block>
        </li>
        <li>
          答えとなる解答が広い時は、要点を「○○、△△、✕✕」のように書くのではなく、以下のように書くと効果的です。
        </li>
        <li>
          <Block>
            (例)
            <br />
            問題: アフリカ大陸内の国を答えよ
            <br />
            要点: アフリカ大陸内の国を答える
          </Block>
        </li>
        <li>
          正解となる答えが少ないなら、要点に「○○、△△、✕✕のいずれか」のように全て書くと効果的です。
        </li>
        <li>
          <Block>
            (例)
            <br />
            問題: ナから始まる国名を答えよ
            <br />
            要点: ナイジェリア、ナウル、ナミビアのいずれか
          </Block>
        </li>
      </ul>
    </div>
  )
}
