import React from 'react';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import NotionService from '../services/notion-service';
import { BlogPost } from '../types/schema';
import BlogCard from '../components/BlogCard';
import Landing from '../components/Landing';
import { name } from '../site.config';
import { useSetRecoilState } from 'recoil';
import { postsState } from '../atoms/atoms';
import { dbProperty } from '../data/Database';

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();
  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
    revalidate: 120,
  };
};

const Home: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const description = 'Welcome to my Notion blog';
  const setPostsState = useSetRecoilState(postsState);

  React.useEffect(() => {
    setPostsState(() => {
      return [...posts];
    });
  });

  const obj = Object.keys(dbProperty);
  console.log(typeof obj);

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
        <Landing />
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center px-10 pt-12 pb-12 justify-center border-b-white border-solid border-b-2">
            <h1 className="font-extrabold text-3xl md:text-xl">최신 포스트</h1>
          </div>
          <section className="grid grid-cols-1 gap-y-8 py-8 px-7 md:gap-y-6 md:overflow-auto md:px-0 overflow-hidden box-border">
            {posts.map((post: BlogPost, idx: number) => (
              <React.Fragment key={post.id}>
                <BlogCard post={post} />
                {idx !== posts.length - 1 && (
                  <span className="block h-1 bg-gray-800 md:hidden" />
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
