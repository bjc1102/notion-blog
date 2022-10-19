import React from 'react';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import NotionService from '@/services/notion-service';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import { revalidate_time } from '@/utils/revalidate';
import BlogCardSection from '@/components/BlogCardSection';
import { BlogPost } from '@/types/schema';

import Meta from '@/components/Meta';

interface IHomeProps {
  posts: BlogPost[];
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();
  const posts = await notionService.getPublishedBlogPosts();
  const queryClient = new QueryClient();

  queryClient.setQueryData('posts', posts);
  // return {
  // 	props: {
  // 		dehydratedState: dehydrate(queryClient),
  // 	},
  // }

  return {
    props: {
      posts,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: revalidate_time,
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
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center px-10 pt-12 pb-12 justify-center border-b-white border-solid border-b-2">
            <h1 className="font-extrabold text-3xl md:text-xl">최신 포스트</h1>
          </div>
          <BlogCardSection posts={posts} />
        </div>
      </main>
    </>
  );
};

export default Home;
