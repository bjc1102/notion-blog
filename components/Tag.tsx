import Link from 'next/link';
import React from 'react';

type tagProps = {
  tag: string;
};

const Tag = ({ tag }: tagProps) => {
  return (
    <span className="border border-solid rounded-xl border-white px-2 py-1 text-base lg:text-sm">
      {tag}
    </span>
  );
};

export default Tag;
