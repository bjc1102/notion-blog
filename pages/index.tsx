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
  const description = 'Welcome to my Notion blog';

  return (
    <>
      <Meta title="HOME" description={description} keywords="notion,blog" />
      <main className="min-h-screen overflow-hidden">
        <Landing />
        <div className="max-w-6xl mx-auto mt-24">
          <PostBlogCardSection posts={posts} />
        </div>
      </main>
    </>
  );
};

export default Home;
