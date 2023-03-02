import React from 'react';

import MainPostCard from './MainPostCard';
import { useRouter } from 'next/router';
import PostCard from '@/components/PostCard/PostCard';
import { BlogPost } from '@/types/schema';

interface IPostCardSectionProps {
  posts: BlogPost[];
}

// eslint-disable-next-line react/display-name
export const postSpreader = () => (post: BlogPost) => {
  return <PostCard key={post.id} post={post} />;
};

const PostCardSection: React.FC<IPostCardSectionProps> = ({ posts }) => {
  const router = useRouter();

  return (
    <section>
      {router.route === '/' && (
        <MainPostCard post={posts.shift() as BlogPost} />
      )}
      <div className="grid grid-cols-3 gap-y-8 lg:gap-y-12 lg:gap-x-5 lg:grid-cols-1 px-6">
        {posts.map(postSpreader())}
      </div>
    </section>
  );
};

export default PostCardSection;
