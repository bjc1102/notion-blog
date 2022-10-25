export interface PostHeaderProps {
  cover: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export type PostHeaderContentsProps = Omit<PostHeaderProps, 'cover'>;
