import React from 'react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

import NotionService from '../services/notion-service';
import { BlogPost } from '../@types/schema';
import BlogCard from '../components/BlogCard';

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();
  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = 'HOME | NOTION BLOG';
  const description = 'Welcome to my Notion blog';
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name={'description'}
          title={'description'}
          content={description}
        />
      </Head>
      <main className="min-h-screen overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-start px-10 mt-10">
            <h1 className="font-extrabold text-3xl md:text-xl">최신 포스트</h1>
          </div>
          <section className="grid grid-cols-1 gap-y-8 py-16">
            {posts.map((post: BlogPost, idx: number) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
