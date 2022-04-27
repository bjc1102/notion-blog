import * as React from 'react'
import { Client } from '@notionhq/client'
import { NotionAPI } from 'notion-client'
import { NextPage, GetStaticPropsContext } from 'next'
import { NotionRenderer } from 'react-notion-x'
import { Code } from 'react-notion-x/build/third-party/code'
import { Collection } from 'react-notion-x/build/third-party/collection'
import { Equation } from 'react-notion-x/build/third-party/equation'
import { Modal } from 'react-notion-x/build/third-party/modal'
import Image from 'next/image'
import Link from 'next/link'
import * as notion from 'notion-types'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

interface IProps {
  recordMap: notion.ExtendedRecordMap
}

const Article = ({ recordMap }: IProps) => {
  return (
    <NotionRenderer
      recordMap={recordMap}
      components={{
        Code,
        Collection,
        Equation,
        Modal,
        nextImage: Image,
        nextLink: Link,
      }}
    />
  )
}

export default Article

// 빌드될 때 실행
export const getStaticPaths = async () => {
  // posts를 받기 위해 fetch
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const databaseID = '5a74d44910624069aa52d4ac84db5f0e'
  const response = await notion.databases.query({
    database_id: databaseID,
  })
  // pre-render할 Path를 얻음 (posts를 통해서)
  const paths = response.results.map((result) => ({
    params: {
      id: result.properties.Name.title[0].mention.page.id,
    },
  }))
  // 우리는 오로지 이 path들만 빌드타임에 프리렌더 함
  // { fallback: false } 는 다른 routes들은 404임을 의미
  // true이면 만들어지지 않은 것도 추후 요청이 들어오면 만들어 줄 거라는 뜻
  console.log(response.results[0].properties.Name.title[0])

  return { paths, fallback: false }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const pageId = params?.id?.toString() || ''
  const notion = new NotionAPI()
  const recordMap = await notion.getPage(pageId)
  return {
    props: {
      recordMap,
    },
  }
}
