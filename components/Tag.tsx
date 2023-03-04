import { useRouter } from 'next/router';
import React from 'react';

type tagProps = {
  tag: string;
};

const Tag = ({ tag }: tagProps) => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (router.query.tags && router.query.tags === e.currentTarget.value)
      return;
  };

  return (
    <button
      onClick={handleClick}
      className={`border border-solid rounded-xl px-2 py-1 text-base lg:text-sm hover:border-yellow-400 hover:text-yellow-400 ${
        router.query.tags === tag
          ? ' border-yellow-400 text-yellow-400'
          : 'border-white'
      }`}
      value={tag}
    >
      <strong>{tag}</strong>
    </button>
  );
};

export default React.memo(Tag);

export const tagSpread = (tags: string[]) =>
  tags.map((v) => <Tag key={v} tag={v} />);
