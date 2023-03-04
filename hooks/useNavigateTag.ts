import React from 'react';
import { useRouter } from 'next/router';

const useNavigateTag = () => {
  const router = useRouter();

  return (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push({ pathname: '/posts', query: { tags: e.currentTarget.value } });
  };
};

export default useNavigateTag;
