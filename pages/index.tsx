import React from 'react';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import NotionService from '../services/notion-service';

import { name } from '../site.config';
import { revalidate_time } from '../utils/revalidate';
import BlogCardSection from '../components/BlogCardSection';
import { BlogPost } from '../types/schema';

interface IHomeProps {
  posts: BlogPost[];
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();
  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts,
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
      <Head>
        <title>HOME | {name}</title>
        <meta
          name={'description'}
          title={'description'}
          content={description}
        />
      </Head>
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
