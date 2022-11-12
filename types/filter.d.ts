export interface FilterOptionMenuProps {
  posts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

export interface FilterOption {
  category: string;
  search: string;
  tags: string;
}

export type handleChangeProps = (
  setState: React.Dispatch<React.SetStateAction<FilterOption>>,
  name: string
) => (e: React.SyntheticEvent) => void;
