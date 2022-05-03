import * as React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import NotionService from '../../services/notion-service';
import Link from 'next/link';
import Image from 'next/image';
import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';
import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Pdf } from 'react-notion-x/build/third-party/pdf';
import { getPageTitle } from 'notion-utils';
import { useRouter } from 'next/router';

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false,
  }
);

const Post = ({
  title,
  recordMap,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { post } = router.query;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={'og:title'} title={'og:title'} content={title} />
        <meta
          name={'og:description'}
          title={'og:description'}
          content="노션을 CMS로 이용하는 블로그입니다"
        />
      </Head>
      <h3>title</h3>
      <div className="bg-gray-900">
        <NotionRenderer
          recordMap={recordMap}
          darkMode={true}
          components={{
            nextImage: Image,
            nextLink: Link,
            Code,
            Collection,
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

  return {
    props: {
      recordMap,
      title,
    },
  };
};

export async function getStaticPaths() {
  const notionService = new NotionService();

  const posts = await notionService.getPublishedBlogPosts();

  // Because we are generating static paths, you will have to redeploy your site whenever
  // you make a change in Notion.
  const paths = posts.map((post) => {
    return `/post/${post.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Post;
