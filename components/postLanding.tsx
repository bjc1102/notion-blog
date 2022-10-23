import { Cover, Description, PageProperty, Tags } from '@/types/property';
import React from 'react';

interface LandingProps {
  cover: string;
  date: string;
  description: string;
  tags: string[];
}

const PostLanding: React.FC<Readonly<LandingProps>> = ({
  cover,
  date,
  description,
  tags,
}) => {
  return (
    <div
      className="relative items-center justify-center min-h-screen min-w-full bg-cover bg-no-repeat bg-center bg-fixed"
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div className="min-h-screen bg-gray-900/70"></div>
    </div>
  );
};

export default PostLanding;
