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
      <a className="bg-gray-300">
        {/* Image */}
        <div className="relative w-96 h-48">
          <Image
            layout="fill"
            objectFit="cover"
            src={post.cover}
            alt={'cover-image'}
          />
        </div>
        {/* Text */}
        <h1 className="text-lg">{post.title}</h1>
        <div className="text-base">
          <h4>{dayjs(post.date).format('LL')}</h4>
        </div>
        <ul className="flex gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <li
              className="border-solid border-2 rounded-sm border-gray-300"
              key={tag.id}
            >
              #{tag.name}
            </li>
          ))}
        </ul>
      </a>
    </Link>
  );
};

export default BlogCard;
