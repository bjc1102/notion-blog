import React from 'react';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import NotionService from '@/services/notion-service';

import PostBlogCardSection from '@/components/PostCardSection';
import { Posts } from '@/types/schema';

import Meta from '@/components/Meta';
import Landing from '@/components/Landing';
import MainText from '@/components/MainText';

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();
  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<Posts> = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = 'CBJ Notion Blog developed with Next.js';
  const description = '노션을 CMS로 활용하여 회고글을 작성하고 있습니다.';

  return (
    <>
      <Meta title={title} description={description} keywords="notion,blog" />
      <main className="min-h-screen overflow-hidden">
        <Landing />
        <MainText />
        <div className="max-w-6xl mx-auto my-12">
          <PostBlogCardSection posts={posts} />
        </div>
      </main>
    </>
  );
};

export default Home;
