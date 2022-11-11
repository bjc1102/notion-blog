import { BlogPost } from '@/types/schema';
import { NextRouter } from 'next/router';
import React from 'react';

type handleSelectProps = (
  setState: (value: React.SetStateAction<string>) => void,
  router: NextRouter,
  posts: BlogPost[],
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>
) => (e: React.SyntheticEvent) => void;

export const handleSelectClick: handleSelectProps =
  (setState, router, posts, setBlogPosts) => (e) => {
    //@ts-ignore
    const target = e.currentTarget.value;
    setState(target);
    setBlogPosts(() => posts.filter((v) => v.category.includes(target)));

    router.push(`/category?category=${target}`);
  };
