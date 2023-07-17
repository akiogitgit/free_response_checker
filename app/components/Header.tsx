import { css } from '@/styled-system/css'
import { FC } from 'react'

export const Header: FC = () => {
  return (
    <div>
      <h1
        className={css({
          fontSize: '3xl',
          lineHeight: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          bg: 'linear-gradient(to right, green, skyblue, blue)',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        })}
      >
        Free Response Checker
      </h1>
      <div
        className={css({
          mt: 8,
        })}
      >
        <p>
          Free Response
          Checkerは、回答が記述式の問題を、AIで正誤判定するアプリケーションです。
        </p>
      </div>

      <div
        className={css({
          mt: 2,
        })}
      >
        <p>あなたの考えた問題文、採点で使う要点、配点を入力しましょう。</p>
        <p>
          採点したい解答を入力し、判定ボタンを押すとAIが採点を行ってくれます。
        </p>
      </div>
    </div>
  )
}
