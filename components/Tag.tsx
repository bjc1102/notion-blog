import { useRouter } from 'next/router';
import React from 'react';

interface tagProps extends React.HTMLAttributes<HTMLButtonElement> {
  tag: string;
}

const Tag = ({ tag, ...props }: tagProps) => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push({ pathname: '/posts', query: { tags: tag } });
  };

  return (
    <button
      {...props}
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

export const TagSpread = (tags: string[]) => {
  const router = useRouter();
  const handleClick =
    (tag: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      router.push({ pathname: '/posts', query: { tags: tag } });
    };
  return tags.map((v) => <Tag onClick={handleClick(v)} key={v} tag={v} />);
};
