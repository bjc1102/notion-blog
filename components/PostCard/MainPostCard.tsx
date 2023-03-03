import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { BlogPost } from '@/types/schema';
import { formatISO } from '@/utils/formatDate';
import Category from '@/components/CategoryBox';
import { tagSpread } from '@/components/Tag';
import useNavigateTag from '@/hooks/useNavigateTag';

interface MainPostCardProps {
  post: BlogPost;
}

const MainPostCard: React.FC<MainPostCardProps> = ({ post }) => {
  const moveTags = useNavigateTag();
  return (
    <Link href={{ pathname: `/post/${post.slug}` }} as={`/post/${post.slug}`}>
      <a>
        {/* 전체 wrapper */}
        <article className="flex lg:flex-col px-6 py-10">
          {/* Image */}
          <div className="relative h-80 lg:h-44 w-1/2 lg:w-full border border-solid border-white rounded">
            <Image
              className="rounded lg:h-9"
              layout="fill"
              objectFit="cover"
              src={post.cover}
              alt="cover-image"
            />
          </div>
          <div className="text-lg px-5 font-normal">
            <h3 className="text-2xl font-bold py-6">{post.title}</h3>
            <span className="text-gray-400">{formatISO(post.date)}</span>
            <span className="mx-2">&#183;</span>
            <Category category={post.category} />
            <p className="py-5 lg:py-2 text-gray-400">{post.description}</p>
            <div className="flex flex-wrap gap-2 mt-5 lg:mt-2">
              {tagSpread(post.tags, moveTags)}
            </div>
          </div>
          {/* Text */}
        </article>
      </a>
    </Link>
  );
};

export default MainPostCard;
