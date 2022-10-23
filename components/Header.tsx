import React from 'react';
import Link from 'next/link';
import useScroll from '@/hooks/useScroll';
import { useRouter } from 'next/router';

export default function Header() {
  const { scroll } = useScroll();

  return (
    <header
      className={`w-full fixed top-0 h-16 text-white z-10 backdrop-blur-md transition duration-300 y-0 ${
        scroll > 50 && 'bg-sub/70'
      }`}
    >
      <div className="max-w-5xl mx-auto px-10 py-6 flex justify-between font-akashi">
        <Link href="/">
          <a className="cursor-pointer relative">Choi</a>
        </Link>
        <Link href="/search">
          <a className="cursor-pointer">search</a>
        </Link>
      </div>
    </header>
  );
}
