import React from 'react';

import { tagSpread } from '@/components/Tag';

interface TagMenuProps {
  AllTag: string[];
}

const TagsMenu = ({ AllTag }: TagMenuProps) => {
  return <div className="mt-6 flex flex-wrap gap-2">{tagSpread(AllTag)}</div>;
};

export default TagsMenu;
