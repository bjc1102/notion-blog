import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Client } from '@notionhq/client'
import { INotionQueryResponse } from '../types/databasesQuery'

//BEM 방식 ( block , element , model )

interface IProps {
  data: Readonly<INotionQueryResponse>
}

const Home = ({ data }: IProps) => {
  useEffect(() => {
    console.log(data)
  }, [])
  return <div></div>
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
      data: respose, // will be passed to the page component as props
    },
  }
}
