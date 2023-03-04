import React from 'react';
import categoryTypeMap from '@/utils/CategoryOption';
import Link from 'next/link';

interface CategoryProps {
  category: keyof typeof categoryTypeMap;
}

const Category: React.FC<CategoryProps> = ({ category }) => {
  const categoryClass = categoryTypeMap[category];

  return (
    <Link passHref href={`/posts?category=${category}`}>
      <button
        className={
          categoryClass +
          ' text-gray-200 py-1 px-2 rounded-lg text-sm hover:cursor-pointer hover:opacity-80'
        }
      >
        {category}
      </button>
    </Link>
  );
};

export default Category;
