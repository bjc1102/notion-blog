import { Client } from '@notionhq/client';
import { BlogPost } from '../types/schema';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';
import { GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

export default class NotionService {
  client: Client;
  notion: NotionAPI;

  constructor() {
    this.client = new Client({
      auth: process.env.NOTION_ACCESS_TOKEN,
    });
    this.notion = new NotionAPI();
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    // list blog posts
    const response = await this.client.databases.query({
      database_id: process.env.NOTION_DB_ID ?? '',
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Updated',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((res) => {
      return NotionService.pageToPostTransformer(res);
    });
  }

  async getSingleBlogPost(slug: string): Promise<ExtendedRecordMap> {
    return this.notion.getPage(slug);
  }

  async getDBproperty(): Promise<GetDatabaseResponse> {
    return await this.client.databases.retrieve({
      database_id: process.env.NOTION_DB_ID ?? '',
    });
  }

  async RetrievePage(pageId: string) {
    const response = await this.client.pages.retrieve({ page_id: pageId });

    return response;
  }

  private static pageToPostTransformer(page: any): BlogPost {
    let cover = page.cover !== null ? page.cover : '';

    switch (cover.type) {
      case 'file':
        cover = page.cover.file.url;
        break;
      case 'external':
        cover = page.cover.external.url;
        break;
      case null:
        cover = 'https://picsum.photos/1920/1080'; // 기본 커버 이미지
        break;
      default:
        cover = 'https://picsum.photos/1920/1080';
    }

    return {
      id: page.id,
      cover: cover,
      type: page.properties.Type.rich_text[0].plain_text,
      title: page.properties.Name.title[0].plain_text,
      tags: page.properties.Tags.multi_select,
      description: page.properties.Description.rich_text[0].plain_text,
      date: page.properties.Updated.last_edited_time,
      slug: page.properties.Slug.formula.string,
    };
  }
}

// API Request
// const response = await this.client.databases.query({
//   database_id: database,
//   filter: {
//     property: 'Slug',
//     formula: {
//       text: {
//         equals: slug, // slug
//       },
//     },
//     // add option for tags in the future
//   },
//   sorts: [
//     {
//       property: 'Updated',
//       direction: 'descending',
//     },
//   ],
// });
