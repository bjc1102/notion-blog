import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  const handleScrollEvent = () => {
    window.scrollY >= 50 ? setScroll(true) : setScroll(false);
  };

  return (
    <header
      className={`w-full fixed top-0 h-16 text-white z-10 backdrop-blur-md transition duration-300 ${
        scroll && 'bg-sub/70'
      }`}
    >
      <div className="max-w-5xl mx-auto px-10 py-6 flex justify-between font-akashi">
        <Link href="/">
          <a className="cursor-pointer relative">BJ Choi</a>
        </Link>
        <Link href="/search">
          <a className="cursor-pointer">search</a>
        </Link>
      </div>
    </header>
  );
}
