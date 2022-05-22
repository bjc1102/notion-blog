import { FunctionComponent } from 'react';
import { BlogPost } from '../@types/schema';
import { TagsTypeMap } from '../styles/tagstype.map';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';

dayjs.extend(localizedFormat);

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard: FunctionComponent<BlogCardProps> = ({ post }) => {
  // const TagsTypeMap = {
  //   gray: 'bg-[#616363] text-white',
  //   brown: 'bg-[#554C2C] text-white',
  //   yellow: 'bg-[#685d00] text-white',
  //   orange: 'bg-[#8a6e46] text-white',
  //   green: 'bg-[#32504c] text-white',
  //   blue: 'bg-[#264259] text-white',
  //   purple: 'bg-[#3A3159] text-white',
  //   pink: 'bg-[#551036] text-white',
  //   red: 'bg-[#501616] text-white',
  // };
  return (
    <Link
      href={{
        pathname: `/post/${post.slug}`,
        query: { image: post.cover },
      }}
      as={`/post/${post.slug}`}
    >
      <a className="block h-36">
        <article className="flex flex-col overflow-hidden px-10 rounded-r-2xl border-solid transition duration-300 hover:translate-x-4 hover:border-l-4 border-accent hover:bg-gray-800">
          {/* Image */}
          <div className="flex gap-3 py-2 items-center">
            <div className="relative w-12 h-12 rounded-3xl overflow-hidden flex-none  md:hidden">
              <Image
                layout="fill"
                objectFit="cover"
                src={post.cover}
                alt={'cover-image'}
              />
            </div>
            <span className="md:hidden">|</span>
            <h1 className="font-semibold text-xl lg:text-base py-2">
              {post.title}
            </h1>
          </div>
          {/* Text */}
          <div className="flex-1 flex flex-col justify-between lg:text-sm">
            <p>{post.description}</p>
            <div className="flex gap-2 flex-wrap py-3 text-gray-300 items-center">
              <h5 className="post-date">{dayjs(post.date).format('LL')}</h5>
              <span>|</span>
              {post.tags.map((tag) => {
                const tagType = TagsTypeMap[tag.color]
                  ? TagsTypeMap[tag.color]
                  : 'bg-sub text-white';
                return (
                  <span
                    key={tag.id}
                    className={`${tagType} p-1 rounded text-sm`}
                  >
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
