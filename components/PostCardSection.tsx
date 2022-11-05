import React from 'react';

import PostCard from '@/components/PostCard';
import { BlogPost } from '../types/schema';
import MainPostCard from './MainPostCard';

interface IPostCardSectionProps {
  posts: BlogPost[];
}

const PostCardSection: React.FC<IPostCardSectionProps> = ({ posts }) => {
  return (
    <section>
      <MainPostCard post={posts[0]} />
      <div className="grid grid-cols-3 gap-y-8 lg:gap-x-5 lg:grid-cols-1">
        {posts
          .filter((v, index) => index !== 0) // 첫번쨰 post는 pass
          .map((post: BlogPost) => {
            return (
              <React.Fragment key={post.id}>
                <PostCard post={post} />
              </React.Fragment>
            );
          })}
      </div>
    </section>
  );
};

export default PostCardSection;
