import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Client } from '@notionhq/client'
import { INotionResult } from '../types/databasesQuery'
import Link from 'next/link'

//BEM 방식 ( block , element , model )

interface IProps {
  data: Readonly<INotionResult[]>
}

const Home = ({ data }: IProps) => {
  const getDatabaseDisplay = () => {
    const jsx: JSX.Element[] = []
    data.forEach((element) => {
      jsx.push(
        <div key={element.id}>
          <p>{element.properties.Title.rich_text[0].plain_text}</p>
          <span>
            {element.properties.Tags.multi_select.map((value) => {
              return value.name
            })}
          </span>
          <p>{element.id}</p>
          <Link
            href={`/article/${element.properties.Name.title[0].mention.page.id}`}
          >
            <a>{element.properties.Name.title[0].mention.page.id}</a>
          </Link>
        </div>
      )
    })
    return jsx
  }

  return <div>{getDatabaseDisplay()}</div>
}

export default Home

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const databaseID = process.env.NOTION_DB_ID ? process.env.NOTION_DB_ID : ''
  const respose = await notion.databases.query({
    database_id: databaseID,
  })

  return {
    props: {
      data: respose.results, // will be passed to the page component as props
    },
  }
}
