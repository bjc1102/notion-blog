import React from 'react';
import Image from 'next/image';
import Banner from 'public/assets/Banner';

interface IProps {
  image?: string;
}

export default function Landing() {
  return (
    <div className="relative w-full pt-16">
      <div className="h-80">
        <Banner />
      </div>
    </div>
  );
}
