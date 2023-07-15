import { css } from '@/styled-system/css'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'AIが採点をするアプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <link rel='icon' href='/ai.webp' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>Free Response Checker</title>
      <meta content='AIが採点をするアプリケーション' name='description' />
      <meta name='keywords' content='正誤判定,AI採点,自動採点' />
      <meta property='og:title' content='Free Response Checker' />
      <meta
        property='og:description'
        content='AIが採点をするアプリケーション'
      />
      <meta
        property='og:url'
        content='https://free-response-checker.vercel.app/'
      />
      <meta property='og:image' content='/ai.webp' />
      <meta property='og:site_name' content='Free Response Checker' />
      <meta property='og:locale' content='ja_JP' />

      <body className={inter.className}>
        <div
          className={css({
            maxW: 500,
            mx: 'auto',
            px: '4',
            mt: '8',
          })}
        >
          {children}
        </div>
      </body>
    </html>
  )
}
