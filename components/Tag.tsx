import Link from 'next/link';
import React from 'react';

type tagProps = {
  tag: string;
};

const Tag = ({ tag }: tagProps) => {
  return (
    <Link passHref href={`/category?category=&tags=${tag}`}>
      <button className="border border-solid rounded-xl border-white px-2 py-1 text-base lg:text-sm">
        {tag}
      </button>
    </Link>
  );
};

export default Tag;
