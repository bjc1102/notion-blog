import { PostHeaderContentsProps } from '@/types/postHeader';
import { formatISO } from '@/utils/formatDate';
import React from 'react';
import Category from '@/components/CategoryBox';
import { tagSpread } from '@/components/Tag';
import usePush from '@/hooks/usePush';

const PostHeaderContent: React.FC<PostHeaderContentsProps> = ({
  title,
  description,
  date,
  category,
  tags,
}) => {
  const moveTags = usePush();
  return (
    <div className="flex flex-col gap-9">
      <title className="text-4xl font-black md:text-2xl">{title}</title>
      <details className="text-xl md:text-lg">{description}</details>
      <div className="flex gap-3 items-center text-lg">
        <span>{formatISO(date)}</span>
        <span>&#183;</span>
        <Category category={category} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {tagSpread(tags, moveTags)}
      </div>
    </div>
  );
};

export default PostHeaderContent;
