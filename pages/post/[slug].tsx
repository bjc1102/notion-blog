import * as React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Pdf } from 'react-notion-x/build/third-party/pdf';

import NotionService from '@/services/notion-service';
import { revalidate_time } from '@/utils/revalidate';
import Meta from '@/components/Meta';
import parseID from '@/utils/parseID';
import { PageProperty } from '@/types/property';

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false,
  }
);

//TODO: 날짜, 이미지, Tag같이 속성 우선 가져오기
export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();
  const pageID = parseID(context.params?.slug as string);

  // @ts-ignore
  const recordMap = await notionService.getSingleBlogPost(pageID);
  if (!recordMap) {
    throw '';
  }
  const PageProperty = (await notionService.RetrievePage(
    pageID
  )) as PageProperty;
  const { properties } = PageProperty;

  // const toc = getPageTableOfContents(, recordMap);

  return {
    props: {
      recordMap,
      cover: PageProperty.cover,
      date: properties.Created,
      tags: properties.Tags,
      description: properties.Description,
    },
    revalidate: revalidate_time,
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
  cover,
  date,
  tags,
  description,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div
        className="min-h-screen min-w-full relative bg-cover bg-no-repeat bg-center bg-fixed"
        style={{ backgroundImage: `url(${cover.file.url})` }}
      ></div>
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
