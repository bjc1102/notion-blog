import React from 'react';
import { getAllTag } from '@/utils/parseTag';
import CategoryMenu from '@/components/PostFilter/CategoryMenu';
import TagsMenu from './TagsMenu';
import { BlogPost } from '@/types/schema';
import SearchMenu from './SearchMenu';

export interface FilterOptionMenuProps {
  posts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}
const FilterOptionMenu = ({ posts }: FilterOptionMenuProps) => {
  return (
    <div className="px-2">
      <div className="flex lg:flex-col gap-3">
        <CategoryMenu />
        <SearchMenu />
      </div>
      <TagsMenu AllTag={getAllTag(posts) as string[]} />
    </div>
  );
};

export default FilterOptionMenu;
