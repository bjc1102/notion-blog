import * as React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Pdf } from 'react-notion-x/build/third-party/pdf';
import { getPageTitle } from 'notion-utils';

import NotionService from '@/services/notion-service';
import { getDate } from '@/utils/getDate';
import { revalidate_time } from '@/utils/revalidate';
import { name } from '../../site.config';

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false,
  }
);

//TODO: 날짜, 이미지, Tag같이 속성 우선 가져오기
export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();
  const pageID = context.params?.slug ?? 'error';

  // @ts-ignore
  const recordMap = await notionService.getSingleBlogPost(pageID);
  const title = getPageTitle(recordMap);

  if (!recordMap) {
    throw '';
  }

  const keys = Object.keys(recordMap.block);
  const block =
    recordMap?.block?.[keys[0]]?.value ??
    recordMap?.block?.[keys[1]]?.value ??
    recordMap?.block?.[keys[2]]?.value;
  return {
    props: {
      recordMap,
      title,
      tags: block.properties['}d~}'],
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
  title,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>
          {title} | {name}
        </title>
        <meta name={'og:title'} title={'og:title'} content={title} />
        <meta
          name={'og:description'}
          title={'og:description'}
          content="노션을 CMS로 이용하는 블로그입니다"
        />
      </Head>
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
    </>
  );
};

export default Post;

{
  /* <div className="divide-y-2 pb-20">
<div className="w-50 mx-auto">
  <h3 className="text-center px-4 pt-12 pb-6 text-2xl font-bold">
    {title}
  </h3>
  <div className="text-center px-3 pb-6 text-gray-500">
    <div className="flex flex-col gap-5">
      <span>{getDate(router.query.date as string)}</span>
      <div className="flex flexCenter gap-2">
        {tags[0][0].split(',').map((v: string, index: number) => {
          return (
            <span key={index} className="tagContainer">
              {v}
            </span>
          );
        })}
      </div>
    </div>
  </div>
</div> */
}
