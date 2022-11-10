import React from 'react';
import FilterOptionMenu from '@/components/FilterOptionMenu';
import Landing from '@/components/Landing';
import { BlogPost, Posts } from '@/types/schema';
import NotionService from '@/services/notion-service';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import PostCardSection from '@/components/PostCardSection';

const Category: NextPage<Posts> = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const blogPosts = posts as BlogPost[];

  return (
    <div className="min-h-screen">
      <Landing />
      <div className="max-w-xl mx-auto mt-32">
        <FilterOptionMenu />
      </div>
      <div className="max-w-6xl mx-auto py-12">
        <PostCardSection posts={blogPosts} />
      </div>
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
