import React from 'react'
import { Client } from '@notionhq/client'
import { NotionAPI } from 'notion-client'
import { NextPage, GetStaticPropsContext } from 'next'
import { NotionRenderer } from 'react-notion-x'

const Article: NextPage = ({ post }: any) => {
  return <NotionRenderer recordMap={post} darkMode={false} />
}

export default Article

// 빌드될 때 실행
export const getStaticPaths = async () => {
  // posts를 받기 위해 fetch
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const databaseID = '5a74d44910624069aa52d4ac84db5f0e'
  const respose = await notion.databases.query({
    database_id: databaseID,
  })
  // pre-render할 Path를 얻음 (posts를 통해서)
  const paths = respose.results.map((result) => ({
    params: {
      id: result.id,
    },
  }))
  // 우리는 오로지 이 path들만 빌드타임에 프리렌더 함
  // { fallback: false } 는 다른 routes들은 404임을 의미
  // true이면 만들어지지 않은 것도 추후 요청이 들어오면 만들어 줄 거라는 뜻
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  // const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const blockID = params?.id?.toString() || ''
  const notion = new NotionAPI()
  const recordMap = await notion.getPage(blockID)
  // const response = await notion.blocks.children.list({
  //   block_id: blockID,
  // })
  return {
    props: {
      post: recordMap,
    },
  }
}
