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
import Meta from '@/components/Meta';
import parseID from '@/utils/parseID';
import PostHeader from '@/components/PostHeader';

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

  if (!recordMap) {
    throw '';
  }

  const properies = await notionService.propertiesTransformer(
    recordMap,
    pageID
  );

  return {
    props: {
      recordMap,
      ...properies,
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
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Meta title={title} keywords={category} description={description} />
      <PostHeader
        title={title}
        cover={cover}
        date={date}
        category={category}
        description={description}
        tags={tags}
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
