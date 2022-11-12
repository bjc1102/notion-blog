import { BlogPost } from '@/types/schema';
import { ParsedUrlQuery } from 'querystring';

export const filterPost = (query: ParsedUrlQuery, posts: BlogPost[]) => {
  return posts.filter((post: BlogPost) => {
    const category = (query.category as string) ?? '';
    const search = (query.search as string) ?? '';

    return post.category.includes(category) && post.title.includes(search);
  });
};
