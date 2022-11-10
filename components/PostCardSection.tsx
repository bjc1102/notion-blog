import React from 'react';

import PostCard from '@/components/PostCard';
import { BlogPost } from '../types/schema';
import MainPostCard from './MainPostCard';

interface IPostCardSectionProps {
  posts: BlogPost[];
}

const PostCardSection: React.FC<IPostCardSectionProps> = ({ posts }) => {
  const Posts = [...posts] as BlogPost[];
  return (
    <section>
      <MainPostCard post={Posts.shift()!} />
      <div className="grid grid-cols-3 gap-y-8 lg:gap-y-12 lg:gap-x-5 lg:grid-cols-1 px-6">
        {Posts.map((post: BlogPost) => {
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
