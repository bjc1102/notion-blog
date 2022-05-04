import { FunctionComponent } from 'react';
import { BlogPost } from '../@types/schema';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import Link from 'next/link';

dayjs.extend(localizedFormat);

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard: FunctionComponent<BlogCardProps> = ({ post }) => {
  return (
    <Link
      href={{
        pathname: `/post/${post.slug}`,
      }}
    >
      <div className="">
        {/* Image */}
        <div className="flex">
          <img
            className="w-96 h-48 object-cover"
            src={post.cover}
            alt={'cover-image'}
          />
        </div>
        {/* Text */}
        <h1 className="text-lg">{post.title}</h1>
        <div className="text-base">
          <h4>{dayjs(post.date).format('LL')}</h4>
        </div>
        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <span className="bg-accent text-base" key={tag.id}>
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
