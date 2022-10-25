import Link from 'next/link';
import React from 'react';

type tagProps = {
  tag: string[];
};

const Tag = ({ tag }: tagProps) => {
  return (
    <ul className="flex justify-center gap-2 text-sm">
      {tag.map((v: string, index: number) => (
        <Link key={index} href="/" passHref>
          <a>
            <li className="border-solid border border-gray-400 p-2 rounded-xl">
              #{v}
            </li>
          </a>
        </Link>
      ))}
    </ul>
  );
};

export default Tag;
