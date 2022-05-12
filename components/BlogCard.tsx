import { FunctionComponent } from 'react';
import { BlogPost } from '../@types/schema';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';

dayjs.extend(localizedFormat);

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard: FunctionComponent<BlogCardProps> = ({ post }) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <a>
        {/* Text */}
        <article className="border-solidborder-l-2 px-6 hover:translate-x-5 transition-all hover:border-l-4 hover:border-accent">
          <div className="flex items-center gap-3">
            {/* Image */}
            {post.cover && (
              <div className="relative w-12 h-12 rounded-3xl overflow-hidden">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={post.cover}
                  alt={'cover-image'}
                />
              </div>
            )}
            <h1 className="font-semibold text-2xl py-2">{post.title}</h1>
          </div>
          <div className="font-thin text-base py-1">
            <p>{post.description}</p>
          </div>
          <ul className="flex gap-2 flex-wrap py-1 text-gray-400">
            <h5>{dayjs(post.date).format('LL')}</h5>
            <span>|</span>
            {post.tags.map((tag) => (
              <li className="flex rounded-lg bg-gray-600" key={tag.id}>
                <span className="px-2 text-gray-300 items-center justify-center">
                  #{tag.name}
                </span>
              </li>
            ))}
          </ul>
        </article>
        <div className="border-b bg-gray-400 my-6 mx-2" />
      </a>
    </Link>
  );
};

export default BlogCard;
