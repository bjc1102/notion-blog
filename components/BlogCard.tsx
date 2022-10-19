import { FunctionComponent } from 'react';
import { BlogPost } from '../types/schema';

import Link from 'next/link';
import Image from 'next/image';
import { getDate } from '../utils/getDate';

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard: FunctionComponent<BlogCardProps> = ({ post }) => {
  return (
    <Link
      href={{
        pathname: `/post/${post.slug}`,
        query: { image: post.cover, date: post.date },
      }}
      as={`/post/${post.slug}`}
    >
      <a className="block h-36">
        <article className="flex flex-col overflow-hidden px-10 md:px-2 py-2 rounded-2xl border-solid transition duration-300 hover:bg-gray-800">
          {/* Image */}
          <div className="flex gap-3 py-2 items-center">
            <div className="relative w-12 h-12 rounded-3xl overflow-hidden flex-none">
              <Image
                layout="fill"
                objectFit="cover"
                src={post.cover}
                alt={'cover-image'}
              />
            </div>
            <span>|</span>
            <h1 className="font-semibold text-xl lg:text-base py-2">
              {post.title}
            </h1>
          </div>
          {/* Text */}
          <div className="flex-1 flex flex-col justify-between lg:text-sm">
            <p>{post.description}</p>
            <div className="flex gap-2 flex-wrap py-3 text-gray-300 items-center">
              <h5 className="post-date">{getDate(post.date)}</h5>
              <span>|</span>
              {post.tags.map((tag) => {
                return (
                  <span key={tag.id} className="tagContainer">
                    #{tag.name}
                  </span>
                );
              })}
            </div>
          </div>
        </article>
      </a>
    </Link>
  );
};

export default BlogCard;
