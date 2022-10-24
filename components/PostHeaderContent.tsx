import { PostHeaderContentsProps } from '@/types/postHeader';
import { formatISO } from '@/utils/formatDate';
import React from 'react';

const PostHeaderContent: React.FC<PostHeaderContentsProps> = ({
  title,
  description,
  date,
  tags,
}) => {
  return (
    <div className="flex flex-col gap-9 px-6">
      <h1 className="text-4xl font-black md:text-2xl">{title}</h1>
      <div className="">{formatISO(date)}</div>
      <div className="">{description}</div>
      <div className="">{tags}</div>
    </div>
  );
};

export default PostHeaderContent;
