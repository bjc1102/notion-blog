import React from 'react';

import Tag from '@/components/Tag';
import useRouterQuery from '@/hooks/useRouterQuery';

interface TagMenuProps {
  AllTag: string[];
}

const TagsMenu = ({ AllTag }: TagMenuProps) => {
  const { query, handleQuery, deleteQuery } = useRouterQuery('tags');
  const handleTags = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectCategory = e.currentTarget.value;
    console.log(selectCategory);
    // if (selectCategory === query.category) return;
    // if (selectCategory !== query.category && selectCategory !== '') {
    //   handleQuery(selectCategory);
    //   return;
    // }
    // if (selectCategory === '') deleteQuery();
  };

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {AllTag.map((tag) => (
        <Tag onClick={handleTags} key={tag} tag={tag} />
      ))}
    </div>
  );
};

export default TagsMenu;
