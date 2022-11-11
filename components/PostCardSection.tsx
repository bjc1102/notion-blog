import React from 'react';

import { BlogPost } from '../types/schema';
import MainPostCard from './MainPostCard';
import { postSpreader } from '@/utils/postSpreader';
import { useRouter } from 'next/router';

interface IPostCardSectionProps {
  posts: BlogPost[];
}

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
