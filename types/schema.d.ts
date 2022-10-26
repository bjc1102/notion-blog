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
  type: string;
  slug: string;
  cover: string;
  title: string;
  tags: Tag[];
  description: string;
  date: string;
};

export type PostPage = {
  post: BlogPost;
  markdown: string;
};
