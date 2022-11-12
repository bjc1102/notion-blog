import React from 'react';
import { useRouter } from 'next/router';

const usePush = () => {
  const router = useRouter();
  return (e: React.SyntheticEvent) => {
    e.preventDefault();
    //@ts-ignore
    router.push(`/posts?tags=${e.target.value}`);
  };
};

export default usePush;
