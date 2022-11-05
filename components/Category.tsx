import React from 'react';
import categoryTypeMap from '@/utils/categoryColors';

interface CategoryProps {
  category: string;
}

const Category: React.FC<CategoryProps> = ({ category }) => {
  //@ts-ignore
  const categoryClass = categoryTypeMap[category];

  return (
    <span
      className={
        categoryClass + ' text-gray-200 py-1 px-2 rounded-full text-sm'
      }
    >
      {category}
    </span>
  );
};

export default Category;
