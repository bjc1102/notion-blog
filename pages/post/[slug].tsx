import * as React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { NotionRenderer } from 'react-notion-x';

import { Code } from 'react-notion-x/build/third-party/code';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Pdf } from 'react-notion-x/build/third-party/pdf';
import { getPageTitle } from 'notion-utils';

import NotionService from '@/services/notion-service';
import Meta from '@/components/Meta';
import parseID from '@/utils/parseID';
import { PageProperty } from '@/types/property';
import PostHeader from '@/components/PostHeader';
import ImgUrlParse from '@/utils/imageTransform';

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: true,
  }
);

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();
  const pageID = parseID(context.params?.slug as string);

  // @ts-ignore
  const recordMap = await notionService.getSingleBlogPost(pageID);
  const keys = Object.keys(recordMap?.block || {});

  if (!recordMap) {
    throw '';
  }

  const title = getPageTitle(recordMap);
  const PageProperty = (await notionService.RetrievePage(
    pageID
  )) as PageProperty;
  const { properties } = PageProperty;

  return {
    props: {
      recordMap,
      title,
      cover: PageProperty.cover,
      date: properties.Created,
      category: properties.Category,
      description: properties.Description,
    },
  };
};

export async function getStaticPaths() {
  const notionService = new NotionService();
  const posts = await notionService.getPublishedBlogPosts();
  const paths = posts.map((post) => {
    return `/post/${post.slug}`;
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

const Post = ({
  recordMap,
  title,
  cover,
  date,
  category,
  description,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const url = ImgUrlParse(cover);
  const descriptionText = description.rich_text[0].plain_text;
  const categoryText = category.select.name;

  return (
    <>
      <Meta title={title} keywords={category} description={descriptionText} />
      <PostHeader
        title={title}
        cover={url}
        date={date.last_edited_time}
        category={categoryText}
        description={descriptionText}
      />
      <div className="rounded-t-xl py-6 overflow-hidden">
        <NotionRenderer
          recordMap={recordMap}
          showTableOfContents={true}
          darkMode={true}
          components={{
            nextImage: Image,
            nextLink: Link,
            Code,
            Equation,
            Modal,
            Pdf,
          }}
        />
      </div>
    </>
  );
};

export default Post;
