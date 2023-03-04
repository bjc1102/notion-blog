import React from 'react';
import { useRouter } from 'next/router';

const useRouterQuery = (queryName: string) => {
  const router = useRouter();
  const { pathname, query } = router;

  const handleQuery = (queryValue: string) => {
    router.push(
      { pathname, query: { ...query, [queryName]: queryValue } },
      '',
      { shallow: true }
    );
  };

  const deleteQuery = () => {
    delete query[queryName];
    // Remove query parameter
    router.push(
      {
        pathname,
        query,
      },
      '',
      { shallow: true }
    );
  };

  return { query, handleQuery, deleteQuery };
};

export default useRouterQuery;
