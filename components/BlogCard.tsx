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
    <Link href={`/post/${post.slug}`}>
      <div className="card-contents">
        {/* Image */}
        <div className="card-content__image">
          <img src={post.cover} alt={'cover-image'} />
        </div>
        {/* Text */}
        <h1>{post.title}</h1>
        <div className="card-content__text">
          <h4>{dayjs(post.date).format('LL')}</h4>
        </div>
        <div className="card-content__tags">
          {post.tags.map((tag) => (
            <span key={tag.id}>#{tag.name}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
