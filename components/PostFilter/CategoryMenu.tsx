import React from 'react';
import { AllCategory } from '@/utils/CategoryOption';
import useRouterQuery from '@/hooks/useRouterQuery';

const CategoryMenu = () => {
  const { query, deleteQuery, handleQuery } = useRouterQuery('category');
  const selectedCategory = query.category ?? '';

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectCategory = e.currentTarget.value;
    if (selectCategory === query.category) return;
    if (selectCategory !== query.category && selectCategory !== '') {
      handleQuery(selectCategory);
      return;
    }
    if (selectCategory === '') deleteQuery();
  };

  return (
    <select
      value={selectedCategory}
      onChange={handleCategory}
      className="border text-sm rounded-sm px-5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">카테고리</option>
      {AllCategory.map((categoryName) => {
        return (
          <option value={categoryName} key={categoryName}>
            {categoryName}
          </option>
        );
      })}
    </select>
  );
};

export default CategoryMenu;
