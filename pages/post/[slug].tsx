import * as React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Pdf } from 'react-notion-x/build/third-party/pdf';
import { getPageTitle } from 'notion-utils';
import dayjs from 'dayjs';

import NotionService from '../../services/notion-service';
import Landing from '../../components/Landing';

import { name } from '../../site.config';
import { IDate } from '../../types/schema';

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false,
  }
);

const Post = ({
  recordMap,
  title,
  block,
  date2,
  date,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  console.log(block);
  console.log(date2);

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
      <div className="divide-y-2 pb-20">
        <Landing image={router.query.image as string} />
        <div>
          <h3 className="text-center px-4 pt-12 pb-6 text-2xl font-bold">
            {title}
          </h3>
          <div className="text-center px-3 pb-6 text-gray-500">
            <span>
              {date} | {tags}
            </span>
          </div>
        </div>
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

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();
  const pageID = context.params?.slug ?? 'error';

  // @ts-ignore
  const recordMap = await notionService.getSingleBlogPost(pageID);
  // @ts-ignore
  const date2: IDate = await notionService.getDateRetrieve(pageID);
  const title = getPageTitle(recordMap);

  if (!recordMap) {
    throw '';
  }

  const keys = Object.keys(recordMap.block);
  const block =
    recordMap?.block?.[keys[0]]?.value ?? recordMap?.block?.[keys[1]]?.value;
  const date = new Date(date2.last_edited_time ?? block.last_edited_time);
  console.log(block.last_edited_time);
  console.log(date2.last_edited_time);

  return {
    props: {
      recordMap,
      title,
      date: dayjs(date).format('LL'),
      block: block.last_edited_time,
      date2: date2.last_edited_time,
      tags: block.properties['}d~}'],
    },
    revalidate: 120,
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

export default Post;
