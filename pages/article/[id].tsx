import { useRouter } from 'next/router'
import React from 'react'

const Article = () => {
  const router = useRouter()
  return <div>{router.route}</div>
}

export default Article
