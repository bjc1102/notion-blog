import React from 'react';
import Image from 'next/image';

interface IProps {
  image?: string;
}

export default function Landing({ image }: IProps) {
  return (
    <div className="relative">
      <div className="relative max-w-6xl h-80 mx-auto mb-20 md:rounded-none rounded-3xl overflow-hidden">
        <Image
          src={image ? image : '/images/earth-1756274_1920.jpg'}
          priority={true}
          layout="fill"
          objectFit="cover"
          alt="Landing_image"
        />
      </div>
      <div className="absolute w-32 h-32 rounded-full overflow-hidden bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 outline">
        <div className="relative w-full h-full">
          <Image
            src="/images/71929440.jpg"
            priority={true}
            layout="fill"
            objectFit="cover"
            alt="Landing_image"
          />
        </div>
      </div>
    </div>
  );
}
