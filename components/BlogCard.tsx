import { FunctionComponent } from 'react';
import { BlogPost } from '../@types/schema';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

dayjs.extend(localizedFormat);

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard: FunctionComponent<BlogCardProps> = ({ post }) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <CardWrapper>
        <div className="card-contents">
          {/* Image */}
          <div className="card-content__image">
            <img src={post.cover} alt={'cover-image'} />
          </div>
          {/* Text */}
          <div className="card-content__text">
            <h4>{dayjs(post.date).format('LL')}</h4>
          </div>
          <div className="card-content__tags">
            {post.tags.map((tag) => (
              <span key={tag.id}>#{tag.name}</span>
            ))}
          </div>
        </div>
      </CardWrapper>
    </Link>
  );
};

export default BlogCard;

const CardWrapper = styled.a`
  &:hover {
    transform: scale(1.15);
  }
  .card-contents {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    overflow: hidden;
    .card-content__image {
      flex-shrink: 0;
      img {
        width: 100%;
        height: 64px;
        object-fit: cover;
      }
    }
  }
`;
