import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import NotionService from '@/services/notion-service';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import PostBlogCardSection from '@/components/PostCard/PostCardSection';
import { Posts } from '@/types/schema';

import Meta from '@/components/Meta';
import Landing from '@/components/Landing';
import MainText from '@/components/MainText';
import useBlogPosts from '@/services/hooks/queries/useGetBlogPosts';

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  const notionService = new NotionService();

  await queryClient.prefetchQuery(['posts'], () =>
    notionService.getPublishedBlogPosts()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Home: NextPage<Posts> = () => {
  const title = 'Notion을 CMS로 활용한 개발 블로그입니다.';
  const description = '노션을 CMS로 활용하여 회고글을 작성하고 있습니다.';
  const { data: posts } = useBlogPosts();

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
