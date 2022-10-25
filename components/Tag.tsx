import Link from 'next/link';
import React from 'react';

type tagProps = {
  tags: string[];
};

const Tag = ({ tags }: tagProps) => {
  return (
    <ul className="flex justify-center gap-2 text-sm">
      {tags.map((tag: string, index: number) => (
        <Link key={index} href={`/posts?tag=${tag}`} passHref>
          <a>
            <li className="border-solid border border-gray-400 p-2 rounded-xl">
              #{tag}
            </li>
          </a>
        </Link>
      ))}
    </ul>
  );
};

export default Tag;
