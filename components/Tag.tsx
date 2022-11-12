import { useRouter } from 'next/router';
import React from 'react';

type tagProps = {
  tag: string;
  onClick?: (e: React.SyntheticEvent) => void;
};

const Tag = ({ tag, onClick }: tagProps) => {
  const query = useRouter().query;

  return (
    <button
      onClick={onClick}
      className={`border border-solid rounded-xl px-2 py-1 text-base lg:text-sm hover:border-yellow-400 hover:text-yellow-400 ${
        query.tags === tag
          ? ' border-yellow-400 text-yellow-400'
          : 'border-white'
      }`}
      value={tag}
    >
      {tag}
    </button>
  );
};

export default React.memo(Tag);

export const tagSpread = (
  tags: string[],
  onClick?: (e: React.SyntheticEvent) => void
) => tags.map((v) => <Tag onClick={onClick} key={v} tag={v} />);
