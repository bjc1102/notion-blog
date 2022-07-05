import { GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';

import NotionService from '../services/notion-service';
import { revalidate_time } from '../utils/revalidate';

interface Props {
  property: GetDatabaseResponse;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const notionService = new NotionService();
  const property = await notionService.getDBproperty();

  return {
    props: {
      property,
    },
    revalidate: revalidate_time,
  };
};

const Search: NextPage<Props> = ({
  property,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div>Search</div>;
};

export default Search;
