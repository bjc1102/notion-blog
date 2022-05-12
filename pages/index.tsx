import React from 'react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

import NotionService from '../services/notion-service';
import { name } from '../site.config';
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
      <div className="w-full">
        <main className="w-50 mx-auto px-5">
          <h1 className="text-xl py-4">{name}</h1>
          <ul className="grid-cols-1 w-50 my-9 content-center">
            {posts.map((post: BlogPost) => (
              <li key={post.id}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
};

export default Home;
