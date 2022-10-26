import { PostHeaderContentsProps } from '@/types/postHeader';
import { formatISO } from '@/utils/formatDate';
import React from 'react';
import Tag from './Tag';

const PostHeaderContent: React.FC<PostHeaderContentsProps> = ({
  title,
  description,
  date,
  tags,
}) => {
  return (
    <div className="flex flex-col gap-9">
      <h1 className="text-4xl font-black md:text-2xl">{title}</h1>
      <p className="text-xl md:text-lg">{description}</p>

      <div className="flex gap-3 items-center text-lg">
        <span>{formatISO(date)}</span>
        <span>&#183;</span>
        <Tag tags={tags} />
      </div>
    </div>
  );
};

export default PostHeaderContent;
