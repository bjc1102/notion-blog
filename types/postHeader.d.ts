export interface PostHeaderProps {
  cover: string;
  title: string;
  date: string;
  description: string;
  category: string[];
}

export type PostHeaderContentsProps = Omit<PostHeaderProps, 'cover'>;
