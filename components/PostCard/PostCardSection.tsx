import React from 'react';

import PostCard from '@/components/PostCard/PostCard';
import { BlogPost } from '@/types/schema';

interface IPostCardSectionProps {
  posts: BlogPost[];
}

export const postSpreader = (post: BlogPost) => {
  return <PostCard key={post.id} post={post} />;
};

const PostCardSection: React.FC<IPostCardSectionProps> = ({ posts }) => {
  return (
    <section>
      {posts.length === 0 ? (
        <div>현재 포스트가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-3 gap-y-8 lg:gap-y-12 lg:gap-x-5 lg:grid-cols-1 px-6">
          {posts.map(postSpreader)}
        </div>
      )}
    </section>
  );
};

export default PostCardSection;
