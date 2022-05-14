import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full fixed top-0 h-16 text-white z-10">
      <div className="max-w-5xl mx-auto px-10 py-5 flex justify-between bg-opacity-0">
        <Link href="/">
          <a className="cursor-pointer">
            <h2>Dev Blog</h2>
          </a>
        </Link>
        <Link href="/search">
          <a className="cursor-pointer">search</a>
        </Link>
      </div>
    </header>
  );
}
