import React from 'react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

import NotionService from '../services/notion-service';
import { BlogPost } from '../@types/schema';
import BlogCard from '../components/BlogCard';
import Landing from '../components/Landing';

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
        <Landing />
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-start px-10 mt-10 md:justify-center">
            <h1 className="font-extrabold text-3xl md:text-2xl">최신 포스트</h1>
          </div>
          <section className="grid grid-cols-1 gap-y-8 py-16">
            {posts.map((post: BlogPost, idx: number) => (
              <React.Fragment key={post.id}>
                <BlogCard post={post} />
                {idx !== posts.length - 1 && (
                  <span className="block h-1 bg-gray-800" />
                )}
              </React.Fragment>
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
