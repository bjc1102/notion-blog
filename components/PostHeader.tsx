import React from 'react';
import { PostHeaderProps } from '@/types/postHeader';
import PostHeaderContent from './PostHeaderContent';
import Image from 'next/image';

const PostHeader: React.FC<Readonly<PostHeaderProps>> = ({
  title,
  cover,
  date,
  description,
  category,
}) => {
  return (
    <header className="relative min-h-screen min-w-full">
      <Image
        className="z-10"
        src={cover}
        layout="fill"
        objectPosition="center"
        objectFit="cover"
        alt="header-cover"
      />
      <div className="relative min-h-screen bg-black/70 z-30">
        <div className="absolute px-4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto z-10 max-w-5xl md:w-full text-white">
          <PostHeaderContent
            title={title}
            date={date}
            description={description}
            category={category}
          />
        </div>
      </div>
    </header>
  );
};

export default PostHeader;
