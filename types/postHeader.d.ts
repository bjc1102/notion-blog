export interface PostHeaderProps {
  cover: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
}

export type PostHeaderContentsProps = Omit<PostHeaderProps, 'cover'>;
