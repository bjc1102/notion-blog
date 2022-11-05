import { FunctionComponent } from 'react';
import { BlogPost } from '../types/schema';

import Link from 'next/link';
import Image from 'next/image';
import { formatISO } from '@/utils/formatDate';
import Category from '@/components/Category';

type PostCardProps = {
  post: BlogPost;
};

const PostCard: FunctionComponent<PostCardProps> = ({ post }) => {
  return (
    <Link href={{ pathname: `/post/${post.slug}` }} as={`/post/${post.slug}`}>
      <a>
        {/* 전체 wrapper */}
        <article className="w-80 lg:w-full m-auto lg:px-4 py-8">
          {/* Image */}
          <div className="relative h-44 border border-solid border-white rounded">
            <Image
              className="rounded"
              layout="fill"
              objectFit="cover"
              src={post.cover}
              alt="cover-image"
            />
          </div>
          <div className="mt-5 font-normal">
            <span className="text-gray-400">{formatISO(post.date)}</span>
            <span className="mx-2">&#183;</span>
            <Category category={post.category} />
            <h3 className="text-xl font-bold py-6">{post.title}</h3>
            <p className="text-gray-400">{post.description}</p>
          </div>
          {/* Text */}
        </article>
      </a>
    </Link>
  );
};

export default PostCard;
