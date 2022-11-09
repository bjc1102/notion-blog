import React from 'react';
import FilterOptionMenu from '@/components/FilterOptionMenu';
import Landing from '@/components/Landing';
import { Posts } from '@/types/schema';
import NotionService from '@/services/notion-service';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';

const Category: NextPage<Posts> = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="min-h-screen">
      <Landing />
      <div className="max-w-xl mx-auto mt-32">
        <FilterOptionMenu />
      </div>
      <div className="max-w-6xl mx-auto my-12"></div>
    </div>
  );
};

export default Category;

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();
  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
  };
};
