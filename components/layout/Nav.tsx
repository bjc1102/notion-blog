import React from 'react';
import Link from 'next/link';
import useScroll from '@/hooks/useScroll';

export default function Nav() {
  const { scroll } = useScroll();

  return (
    <nav
      className={`w-full fixed top-0 py-5 h-16 text-white z-50 transition duration-300 ${
        scroll > 50 && 'bg-primary border-solid border-b border-gray-600/70'
      }`}
    >
      <div className="max-w-5xl mx-auto px-10">
        <div className="flex justify-between items-center font-akashi text-lg">
          <Link href="/">
            <a className="cursor-pointer">Choi</a>
          </Link>
          <div>
            <Link href="/posts">
              <a className="cursor-pointer">search</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
