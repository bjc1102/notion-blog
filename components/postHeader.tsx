import React from 'react';
import { PostHeaderProps } from '@/types/postHeader';
import PostHeaderContent from './PostHeaderContent';

const PostLanding: React.FC<Readonly<PostHeaderProps>> = ({
  cover,
  date,
  description,
  tags,
}) => {
  return (
    <header
      className="relative items-center justify-center min-h-screen min-w-full bg-cover bg-no-repeat bg-center bg-fixed"
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div className="min-h-screen flexCenter flex-col bg-gray-900/70">
        <PostHeaderContent date={date} description={description} tags={tags} />
      </div>
    </header>
  );
};

export default PostLanding;
