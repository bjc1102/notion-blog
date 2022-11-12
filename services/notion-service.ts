import { Client } from '@notionhq/client';
import { BlogPost } from '../types/schema';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';
import { GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { parseTag } from '@/utils/parseTag';
import { PageProperty } from '@/types/property';
import { getPageTitle } from 'notion-utils';
import ImgUrlParse from '@/utils/imageTransform';

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static pageToPostTransformer(page: any): BlogPost {
    let cover = ImgUrlParse(page.cover);

    const tags = parseTag(
      page.properties.Tag.rich_text[0].plain_text as string
    );

    return {
      id: page.id,
      cover: cover,
      title: page.properties.Name.title[0].plain_text,
      category: page.properties.Category.select.name,
      description: page.properties.Description.rich_text[0].plain_text,
      date: page.properties.Updated.last_edited_time,
      slug: page.properties.Slug.formula.string,
      tags: tags,
    };
  }

  async propertiesTransformer(recordMap: ExtendedRecordMap, pageID: string) {
    const title = getPageTitle(recordMap);
    const PageProperty = (await this.RetrievePage(pageID)) as PageProperty;
    const { properties } = PageProperty;
    const url = ImgUrlParse(PageProperty.cover);
    const tags = parseTag(properties.Tag.rich_text[0].plain_text as string);

    return {
      title,
      cover: url,
      date: properties.Updated.last_edited_time,
      category: properties.Category.select.name,
      description: properties.Description.rich_text[0].plain_text,
      tags: tags,
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
