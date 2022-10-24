import React from 'react';
import { PostHeaderProps } from '@/types/postHeader';
import PostHeaderContent from './PostHeaderContent';

const PostLanding: React.FC<Readonly<PostHeaderProps>> = ({
  title,
  cover,
  date,
  description,
  tags,
}) => {
  return (
    <header
      className="relative min-h-screen min-w-full flexCenter bg-cover bg-no-repeat bg-center bg-fixed bg-blend-darken bg-black/70"
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div className="max-w-5xl h-full mx-auto z-10 text-white">
        <PostHeaderContent
          title={title}
          date={date}
          description={description}
          tags={tags}
        />
      </div>
    </header>
  );
};

export default PostLanding;
