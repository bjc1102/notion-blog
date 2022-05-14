export type Tag = {
  color:
    | 'gray'
    | 'brown'
    | 'orange'
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'red';
  id: string;
  name: string;
};

export type BlogPost = {
  id: string;
  type: '개발' | '회고';
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
