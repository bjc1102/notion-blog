import { GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';

import NotionService from '../services/notion-service';
import { revalidate_time } from '../utils/revalidate';

interface Props {
  property: GetDatabaseResponse;
}

interface ITags {
  type: 'multi_select';
  multi_select: {
    options: Array<{
      name: string;
      id?: string;
      color?: string;
    }>;
  };
  id: string;
  name: string;
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
  //@ts-ignore
  const properties_tag: ITags = property.properties.Tags;

  console.log(properties_tag.multi_select.options);
  return <div>Search</div>;
};

export default Search;
