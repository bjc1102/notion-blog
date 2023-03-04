import React from 'react';
import Input from '@/components/Input';
import useRouterQuery from '@/hooks/useRouterQuery';
import { debounce } from 'lodash';

const SearchMenu = () => {
  const { deleteQuery, handleQuery } = useRouterQuery('search');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: search } = e.target;
    if (search.length === 0) {
      deleteQuery();
      return;
    }
    handleQuery(search);
  };
  const InputChangeDebounce = debounce(handleChange, 200);

  return <Input onChange={InputChangeDebounce} name="search" />;
};

export default SearchMenu;
