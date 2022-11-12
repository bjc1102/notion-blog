import { BlogPost } from '@/types/schema';

export const parseTag = (str: string) => {
  return str.replaceAll(/ /g, '').split(',');
};

export const getAllTag = (posts: BlogPost[]) => {
  const set = new Set();
  for (const post of posts) {
    post.tags.forEach((v) => set.add(v));
  }
  return Array.from(set);
};
