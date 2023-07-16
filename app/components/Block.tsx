import { css } from '@/styled-system/css'
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Block: FC<Props> = ({ children }) => {
  return (
    <pre
      className={css({
        bg: '#ededed',
        p: 4,
        rounded: '8px',
      })}
    >
      {children}
    </pre>
  )
}
