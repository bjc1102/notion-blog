import React, { useEffect } from 'react'
import { Client } from '@notionhq/client'
import { useRouter } from 'next/router'
import { NextPage, GetStaticPaths } from 'next'

const Article: NextPage = ({ data }: any) => {
  useEffect(() => {
    console.log(data)
  }, [])
  const router = useRouter()
  const { id } = router.query
  return <div>{id}</div>
}

export default Article

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const blockID = params.id
  const response = await notion.blocks.children.list({
    block_id: blockID,
  })
  return {
    props: {
      data: response,
    },
  }
}
