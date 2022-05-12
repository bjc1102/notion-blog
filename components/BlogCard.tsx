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
        <article className="border-solid border-l-2 pl-3">
          <div className="flex items-center gap-3">
            {/* Image */}
            {post.cover && (
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden">
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
          <div className="font-thin text-lg py-1">
            <p>{post.description}</p>
          </div>
          <ul className="flex gap-2 flex-wrap py-1 text-gray-400">
            <h5 className="">{dayjs(post.date).format('LL')}</h5>
            {post.tags.map((tag) => (
              <li
                className="border-solid border-2 rounded-lg border-gray-400"
                key={tag.id}
              >
                <span className="px-3">#{tag.name}</span>
              </li>
            ))}
          </ul>
        </article>
      </a>
    </Link>
  );
};

export default BlogCard;
