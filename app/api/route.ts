import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  return NextResponse.json({ posts })
}

export async function POST(request: Request) {
  const body = await request.json()
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  return NextResponse.json({ body, posts })
}

export async function DELETE(request: Request) {
  const body = await request.json()
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  return NextResponse.json({ body, posts })
}
