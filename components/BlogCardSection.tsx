import React from 'react';

import BlogCard from './BlogCard';
import { BlogPost } from '../types/schema';

interface IBlogCardSectionProps {
  posts: BlogPost[];
}

const BlogCardSection: React.FC<IBlogCardSectionProps> = ({ posts }) => {
  return (
    <section className="grid grid-cols-1 gap-y-8 py-8 px-7 md:gap-y-6 md:overflow-hidden md:px-0 overflow-hidden box-border">
      {posts.length ? (
        posts.map((post: BlogPost, idx: number) => (
          <React.Fragment key={post.id}>
            <BlogCard post={post} />
            {idx !== posts.length - 1 && (
              <span className="md:hidden block h-1 bg-gray-800" />
            )}
          </React.Fragment>
        ))
      ) : (
        <span className="w-full text-gray-400">
          현재 조건을 만족하는 포스트가 없습니다.
        </span>
      )}
    </section>
  );
};

export default BlogCardSection;
