import categoryTypeMap from '@/utils/CategoryOption';

export type Tag = {
  id: string;
  name: string;
};

export interface IDate {
  object?: string;
  type?: string;
  id?: 'P%5Eya';
  last_edited_time?: string;
}

export type BlogPost = {
  id: string;
  slug: string;
  cover: string;
  title: string;
  category: keyof typeof categoryTypeMap;
  description: string;
  date: string;
  tags: string[];
};

export type PostPage = {
  post: BlogPost;
  markdown: string;
};

interface Posts {
  posts: BlogPost[];
}
