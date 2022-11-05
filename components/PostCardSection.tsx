import React from 'react';

import PostCard from './PostCard';
import { BlogPost } from '../types/schema';

interface IPostCardSectionProps {
  posts: BlogPost[];
}

const PostCardSection: React.FC<IPostCardSectionProps> = ({ posts }) => {
  return (
    <section className="grid grid-cols-3 gap-y-8 md:grid-cols-1">
      {posts.length ? (
        posts.map((post: BlogPost) => (
          <React.Fragment key={post.id}>
            <PostCard post={post} />
          </React.Fragment>
        ))
      ) : (
        <span className="w-full text-gray-400">업데이트 예정입니다..!</span>
      )}
    </section>
  );
};

export default PostCardSection;
