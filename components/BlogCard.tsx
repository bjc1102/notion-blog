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
      <a className="bg-gray-300 flex w-full">
        {/* Image */}
        <div className="relative w-48 h-28">
          <Image
            layout="fill"
            objectFit="cover"
            src={post.cover}
            alt={'cover-image'}
          />
        </div>
        {/* Text */}
        <div>
          <h1 className="text-lg font-semibold">{post.title}</h1>
          <div className="text-sm font-thin">
            <p>{post.description}</p>
          </div>
          <div className="text-base">
            <h5>{dayjs(post.date).format('LL')}</h5>
          </div>
          <ul className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <li
                className="border-solid border-2 rounded-sm border-gray-300"
                key={tag.id}
              >
                <span className="px-1">#{tag.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </a>
    </Link>
  );
};

export default BlogCard;
