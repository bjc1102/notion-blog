import { Client } from '@notionhq/client';
import { BlogPost, PostPage } from '../@types/schema';
import { NotionToMarkdown } from 'notion-to-md';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from '../node_modules/notion-types/build/maps';

export default class NotionService {
  client: Client;
  n2m: NotionToMarkdown;
  notion: NotionAPI;

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
    this.notion = new NotionAPI();
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    const database = process.env.NOTION_DB_ID ?? '';
    // list blog posts
    const response = await this.client.databases.query({
      database_id: database,
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
    const database = process.env.NOTION_DB_ID ?? '';
    // list of blog posts
    const response = await this.client.databases.query({
      database_id: database,
      filter: {
        property: 'Slug',
        formula: {
          text: {
            equals: slug, // slug
          },
        },
        // add option for tags in the future
      },
      sorts: [
        {
          property: 'Updated',
          direction: 'descending',
        },
      ],
    });

    if (!response.results[0]) {
      throw 'No results available';
    }
    // grab page from notion
    const recordMap = await this.notion.getPage(response.results[0].id);
    return recordMap;
  }

  private static pageToPostTransformer(page: any): BlogPost {
    let cover = page.cover;
    switch (cover.type) {
      case 'file':
        cover = page.cover.file;
        break;
      case 'external':
        cover = page.cover.external.url;
        break;
      default:
        // 기본 커버 이미지
        cover = 'https://picsum.photos/200/300?grayscale';
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
