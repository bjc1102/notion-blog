import React from 'react';
import { debounce } from 'lodash';
import Input from '@/components/Input';
import { AllCategory } from '@/utils/CategoryOption';
import { useRouter } from 'next/router';
import { getAllTag } from '@/utils/parseTag';
import { tagSpread } from './Tag';
import {
  FilterOption,
  FilterOptionMenuProps,
  handleChangeProps,
} from '@/types/filter';
import { getRouterPath } from '@/utils/parseRouterPath';

const FilterOptionMenu: React.FC<FilterOptionMenuProps> = ({
  posts,
  setBlogPosts,
}) => {
  const router = useRouter();
  const allTag = getAllTag(posts) as string[];
  const [filterOption, setFilterOption] = React.useState<FilterOption>({
    category: (router.query.category as string) ?? '',
    search: (router.query.search as string) ?? '',
    tags: (router.query.tags as string) ?? '',
  });

  // eslint-disable-next-line react/display-name
  const showAllCategory = () => (categoryName: string) => {
    return (
      <option value={categoryName} key={categoryName}>
        {categoryName}
      </option>
    );
  };

  const handleChange: handleChangeProps = (setState, name) => (e) => {
    //@ts-ignore
    const value = e.target.value;
    setState((previous: FilterOption) => {
      if (name === 'tags' && value === previous['tags'])
        return { ...previous, tags: '' };
      return { ...previous, [name]: value };
    });
  };

  const InputDebounce = debounce(handleChange(setFilterOption, 'search'), 200);

  React.useEffect(() => {
    setBlogPosts(() => {
      return posts.filter((post) => {
        return (
          post.title.includes(filterOption.search) &&
          post.category.includes(filterOption.category) &&
          (filterOption.tags === '' || post.tags.includes(filterOption.tags))
        );
      });
    });
    router.push(getRouterPath(filterOption), undefined, {
      scroll: false,
      shallow: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOption]);

  return (
    <div className="px-2">
      <div className="flex lg:flex-col gap-3">
        <select
          value={filterOption.category}
          onChange={handleChange(setFilterOption, 'category')}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 px-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">카테고리</option>
          {AllCategory.map(showAllCategory())}
        </select>
        <Input name="search" onChange={InputDebounce} />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {tagSpread(allTag, handleChange(setFilterOption, 'tags'))}
      </div>
    </div>
  );
};

export default FilterOptionMenu;
