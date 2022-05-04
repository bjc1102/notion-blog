import React from 'react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

import NotionService from '../services/notion-service';
import { name } from '../site.config';
import { BlogPost } from '../@types/schema';
import BlogCard from '../components/BlogCard';

export const getStaticProps: GetStaticProps = async (context) => {
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
  const title = 'Test Blog';
  const description = 'Welcome to my Notion blog';
  return (
    <div className="flex flex-col">
      <Head>
        <title>{title}</title>
        <meta
          name={'description'}
          title={'description'}
          content={description}
        />
      </Head>
      <div className="mx-auto overflow-hidden">
        <div className="my-4">
          <h1 className="text-xl">{name}</h1>
        </div>
        <div>
          {posts.map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
