import React from 'react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

import NotionService from '../services/notion-service';
import { name } from '../site.config';
import { flexCenter } from '../styles/theme';
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
    <>
      <Head>
        <title>{title}</title>
        <meta
          name={'description'}
          title={'description'}
          content={description}
        />
      </Head>
      <MainContentWrapper>
        <div className="main-article">
          <div className="main-article__title">
            <h1 className="main-ariticle__text">{name}</h1>
          </div>
          {posts.map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </MainContentWrapper>
    </>
  );
};

export default Home;

const MainContentWrapper = styled.main`
  min-height: 100vh;
  .main-article {
    max-width: 64rem;
    margin: 0 auto;
    .main-article__title {
      ${flexCenter}
      .main-ariticle__text {
        font-size: 1.125rem; /* 18px */
        line-height: 1.75rem; /* 28px */
        text-align: center;
      }
    }
  }
`;
