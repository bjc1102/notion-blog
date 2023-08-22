import React from 'react';

import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import PostFilter from '@/components/PostFilter';
import Landing from '@/components/Landing';
import PostCardSection from '@/components/PostCard/PostCardSection';
import useBlogPosts from '@/services/hooks/queries/useGetBlogPosts';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import NotionService from '@/services/notion-service';

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  const notionService = new NotionService();

  await queryClient.prefetchQuery(['posts'], () =>
    notionService.getPublishedBlogPosts()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Category: NextPage = () => {
  const router = useRouter();
  const { data: posts } = useBlogPosts();

  const handlePosts = () => {
    const blogPosts = posts;
    const { tags, category, search } = router.query;

    //tags, category, search에 따라 검색결과 필터
    const filteredPosts = blogPosts.filter((post) => {
      if (tags && !post.tags.includes(tags as string)) return false;
      if (category && post.category !== category) return false;
      if (search && !post.title.toLowerCase().includes(search as string))
        return false;
      return true;
    });

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
