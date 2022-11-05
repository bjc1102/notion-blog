import React from 'react';
import Image from 'next/image';
import BannerImage from '../public/images/earth-1756274_1920.jpg';
import ProfileImage from '../public/images/71929440.jpg';

export default function Landing() {
  return (
    <div className="relative w-full pt-16">
      <div className="relative max-w-6xl h-80 mx-auto rounded-3xl border border-solid md:rounded-none md:border-l-0 md:border-r-0">
        <Image
          className="rounded-3xl md:rounded-none"
          layout="fill"
          objectFit="fill"
          src={BannerImage}
          placeholder="blur"
          alt="banner"
        />
        <div className="absolute -translate-x-1/2 translate-y-1/2 bottom-0 left-1/2 w-36 border-2 border-solid border-white rounded-full overflow-hidden">
          <Image src={ProfileImage} alt="profile" />
        </div>
      </div>
    </div>
  );
}
