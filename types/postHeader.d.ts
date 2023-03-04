import categoryTypeMap from '@/utils/CategoryOption';

export interface PostHeaderProps {
  cover: string;
  title: string;
  date: string;
  description: string;
  category: keyof typeof categoryTypeMap;
  tags: string[];
}

export type PostHeaderContentsProps = Omit<PostHeaderProps, 'cover'>;
