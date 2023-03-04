import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';

import React from 'react';
import PostFilter from '@/components/PostFilter';
import Landing from '@/components/Landing';
import { BlogPost, Posts } from '@/types/schema';
import NotionService from '@/services/notion-service';
import PostCardSection from '@/components/PostCard/PostCardSection';
import { useRouter } from 'next/router';

const Category: NextPage<Posts> = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const handlePosts = () => {
    const blogPosts = posts as BlogPost[];
    const { tags, category, search } = router.query;

    //tags, category, search에 따라 검색결과 필터
    const filteredPosts = blogPosts.filter((post) => {
      if (tags && !post.tags.includes(tags as string)) return false;
      if (category && post.category !== category) return false;
      if (search && !post.title.toLowerCase().includes(search as string))
        return false;
      return true;
    });

    //query가 있으면 전체 포스트 리턴
    return Object.keys(router.query).length === 0 ? posts : filteredPosts;
  };

  return (
    <div className="min-h-screen">
      <Landing />
      <div className="max-w-xl mx-auto mt-32">
        <PostFilter posts={posts} />
      </div>
      <div className="max-w-6xl mx-auto py-12">
        <PostCardSection posts={handlePosts()} />
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
