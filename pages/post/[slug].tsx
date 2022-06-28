import * as React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import NotionService from '../../services/notion-service';
import Landing from '../../components/Landing';

import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Pdf } from 'react-notion-x/build/third-party/pdf';
import { getPageTitle, getPageProperty } from 'notion-utils';
import { name } from '../../site.config';
import dayjs from 'dayjs';

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false,
  }
);

const Post = ({
  recordMap,
  title,
  date,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

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
            // Collection,
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

  // @ts-ignore
  const recordMap = await notionService.getSingleBlogPost(context.params?.slug);
  const title = getPageTitle(recordMap);

  if (!recordMap) {
    throw '';
  }

  const keys = Object.keys(recordMap?.block || {});
  const block = recordMap?.block?.[keys[0]]?.value;

  const date = new Date(block.last_edited_time);

  return {
    props: {
      recordMap,
      title,
      date: dayjs(date).format('LL'),
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
