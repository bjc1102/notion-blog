import { NextRouter } from 'next/router';
import React from 'react';

type handleSelectProps = (
  setState: (value: React.SetStateAction<string>) => void,
  router: NextRouter
) => (e: React.SyntheticEvent) => void;

export const handleSelectClick: handleSelectProps =
  (setState, router) => (e) => {
    //@ts-ignore
    const target = e.currentTarget.value;
    setState(target);
    router.push(`/category?category=${target}`);
  };
