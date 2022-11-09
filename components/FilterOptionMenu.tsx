import React from 'react';
import Input from '@/components/Input';
import categoryTypeMap, { filterTest } from '@/utils/categoryColors';
import { handleSelectClick } from '@/utils/FilterOption';
import { useRouter } from 'next/router';

const FilterOptionMenu = () => {
  const category = Object.keys(categoryTypeMap).filter(filterTest());
  const router = useRouter();
  const query = (router.query.category as string) ?? '';
  const [categoryState, setCategoryState] = React.useState(query);
  // eslint-disable-next-line react/display-name
  const showAllCategory = () => (categoryName: string) => {
    return (
      <option value={categoryName} key={categoryName}>
        {categoryName}
      </option>
    );
  };

  return (
    <div className="flex lg:flex-col gap-3">
      <select
        value={categoryState}
        onChange={handleSelectClick(setCategoryState, router)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {category.map(showAllCategory())}
      </select>
      <Input name="search" />
    </div>
  );
};

export default FilterOptionMenu;
