import { GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import SearchIcon from '../public/assets/Search';

import NotionService from '../services/notion-service';
import { revalidate_time } from '../utils/revalidate';

interface Props {
  property: GetDatabaseResponse;
}

interface ITags {
  options: Array<{
    name: string;
    id?: string;
    color?: string;
  }>;
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
  const [search, setSearch] = React.useState('');
  //@ts-ignore
  const properties_tag: ITags = property.properties.Tags.multi_select;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <div className="max-w-3xl mx-auto mt-24 py-8 px-12 box-border">
      <div className="relative felxCenter overflow-hidden">
        <div className="absolute bottom-2 left-4">
          <SearchIcon />
        </div>
        <input
          className="border-2 text-sm rounded-lg block w-full p-2.5 pl-12 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-accent focus:border-accent outline-none"
          placeholder="검색어를 입력하세요"
          onChange={handleChange}
          value={search}
        />
      </div>
    </div>
  );
};

export default Search;
