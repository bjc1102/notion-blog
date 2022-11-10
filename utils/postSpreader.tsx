import React from 'react';
import { BlogPost } from '@/types/schema';
import PostCard from '@/components/PostCard';

// eslint-disable-next-line react/display-name
export const postSpreader = () => (post: BlogPost) => {
  return <PostCard key={post.id} post={post} />;
};
