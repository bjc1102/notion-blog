import React from 'react';
import {
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';

import NotionService from '../services/notion-service';
import { BlogPost } from '../@types/schema';
import BlogCard from '../components/BlogCard';
import Landing from '../components/Landing';
import { name } from '../site.config';

// export const getStaticProps: GetStaticProps = async () => {
//   const notionService = new NotionService();
//   const posts = await notionService.getPublishedBlogPosts();

//   return {
//     props: {
//       posts,
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps = async () => {
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
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
        <Landing />
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center px-10 pt-12 pb-3 justify-center">
            <h1 className="font-extrabold text-3xl md:text-2xl">최신 포스트</h1>
          </div>
          <section className="grid grid-cols-1 gap-y-8 py-16">
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
