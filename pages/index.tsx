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
  useEffect(() => {
    console.log(data)
  }, [])

  const getDatabaseDisplay = () => {
    const jsx: JSX.Element[] = []
    data.forEach((element) => {
      jsx.push(
        <div key={element.id}>
          <p>{element.properties.Name.title[0].plain_text}</p>
          <span>
            {element.properties.Tags.multi_select.map((value) => {
              return value.name
            })}
          </span>
          <p>{element.id}</p>
          <Link href={`/article/${element.id}`}>HELLO</Link>
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
  const databaseID = '5a74d44910624069aa52d4ac84db5f0e'
  const respose = await notion.databases.query({
    database_id: databaseID,
  })

  return {
    props: {
      data: respose.results, // will be passed to the page component as props
    },
  }
}
