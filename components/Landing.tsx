import React from 'react';
import Image from 'next/image';

export default function Landing() {
  return (
    <div className="relative max-w-6xl h-80 mx-auto mb-20 md:rounded-none rounded-3xl overflow-hidden">
      <Image
        src="/images/earth-1756274_1920.jpg"
        layout="fill"
        objectFit="cover"
        alt="Landing_image"
      />
    </div>
  );
}
