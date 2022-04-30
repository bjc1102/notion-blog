import { NotionAPI } from 'notion-client'
import { Client } from '@notionhq/client'

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export const notionAPI = new NotionAPI()
