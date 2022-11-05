import React from 'react';
import categoryColors from '@/utils/categoryColors';

interface CategoryProps {
  category: string;
}

const Category: React.FC<CategoryProps> = ({ category }) => {
  return (
    <span
      //@ts-ignore
      className={`text-gray-200 py-1 px-2 rounded-full text-sm ${categoryColors[category]}`}
    >
      {category}
    </span>
  );
};

export default Category;
