import React from 'react';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import NotionService from '@/services/notion-service';
import { dehydrate, QueryClient } from 'react-query';

import PostBlogCardSection from '@/components/PostCardSection';
import { BlogPost } from '@/types/schema';

import Meta from '@/components/Meta';
import Landing from '@/components/Landing';

interface IHomeProps {
  posts: BlogPost[];
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();
  const queryClient = new QueryClient();

  let posts = queryClient.getQueryData(['posts']);

  if (!posts) {
    posts = await notionService.getPublishedBlogPosts();
    queryClient.setQueryData(['posts'], posts);
  }

  return {
    props: {
      posts,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Home: NextPage<IHomeProps> = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = 'CBJ Notion Blog developed with Next.js';
  const description = '노션을 CMS로 활용하여 회고글을 작성하고 있습니다.';

  return (
    <>
      <Meta title={title} description={description} keywords="notion,blog" />
      <main className="min-h-screen overflow-hidden">
        <Landing />
        <div className="max-w-6xl mx-auto my-24">
          <PostBlogCardSection posts={posts} />
        </div>
      </main>
    </>
  );
};

export default Home;
