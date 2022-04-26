export interface INotionQueryResponse {
  object: 'list'
  results: INotionResult[]
  type: string
}

export interface INotionResult {
  object: 'page'
  id: string
  created_time: string
  last_edited_time: string
  created_by: ITimeProps
  last_edited_by: ITimeProps
  cover: null
  parent: {
    database_id: string
    type: string
  }
  archived: false
  properties: {
    'Last Edited': {
      id: string
      type: properties_type
      last_edited_time: string
    }
    Tags: {
      id: string
      type: properties_type
      multi_select: ISelectProps[]
    }
    Name: {
      id: string
      type: properties_type
      title: [
        {
          type: string
          plain_text: string
          href: string
          mention: {
            type: string
            page: {
              id: string
            }
          }
        }
      ]
    }
    Title: {
      id: string
      type: string
      rich_text: [
        {
          type: string
          text: {
            content: string
          }
          plain_text: string
        }
      ]
    }
  }
  url: string
}

interface ITimeProps {
  id: string
  object: string
  last_edited_time?: string
  created_time?: string
}

interface ISelectProps {
  id: string
  name: string
}

type properties_type = 'date' | 'title' | 'select' | 'multi_select'
