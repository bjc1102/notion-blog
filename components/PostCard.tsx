import { FunctionComponent } from 'react';
import { BlogPost } from '../types/schema';

import Link from 'next/link';
import Image from 'next/image';
import { formatISO } from '@/utils/formatDate';

type PostCardProps = {
  post: BlogPost;
};

const PostCard: FunctionComponent<PostCardProps> = ({ post }) => {
  return (
    <Link href={{ pathname: `/post/${post.slug}` }} as={`/post/${post.slug}`}>
      <a>
        {/* 전체 wrapper */}
        <article className="w-80">
          {/* Image */}
          <div className="relative w-full h-44 border border-solid border-white">
            <Image
              layout="fill"
              objectFit="cover"
              src={post.cover}
              alt={'cover-image'}
            />
          </div>
          <div>
            <span className="">{formatISO(post.date)}</span>
            <span className="">{post.category}</span>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
          {/* Text */}
        </article>
      </a>
    </Link>
  );
};

export default PostCard;
