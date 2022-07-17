import { GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import SearchIcon from '../public/assets/SearchIcon';
import Input from '../components/Input';

import NotionService from '../services/notion-service';
import { revalidate_time } from '../utils/revalidate';
import { BlogPost } from '../types/schema';
import BlogCardSection from '../components/BlogCardSection';
import _ from 'lodash';

interface Props {
  property: GetDatabaseResponse;
  posts: BlogPost[];
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
  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      property,
      posts,
    },
    revalidate: revalidate_time,
  };
};

const Search: NextPage<Props> = ({
  property,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [postLists, setpostLists] = React.useState(posts);
  const [search, setSearch] = React.useState('');
  const [filterTag, setFilterTag] = React.useState<string>();
  //@ts-ignore
  const properties_tag: ITags = property.properties.Tags.multi_select;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleTagClicK = (TagName: string) => {
    setFilterTag(TagName);
  };

  // React.useEffect(() => {}, [filterTag, search]);

  return (
    <div className="max-w-3xl mx-auto mt-24 py-8 px-12 box-border">
      <div className="relative felxCenter overflow-hidden">
        <div className="absolute w-6 h-6 bottom-2 left-3">
          <SearchIcon />
        </div>
        <Input name="search" onChange={handleChange} value={search} />
      </div>
      <div className="grid grid-cols-8 lg:grid-cols-4 gap-2 w-full py-10 border">
        {properties_tag.options.map((v) => {
          return (
            <button
              className={`tagContainer flexCenter cursor-pointer focus:ring focus:ring-gray-400 ${
                v.name === filterTag && 'bg-accent text-gray-200'
              }`}
              key={v.id}
              onClick={() => handleTagClicK(v.name ?? '')}
            >
              {v.name}
            </button>
          );
        })}
      </div>
      <BlogCardSection posts={postLists} />
    </div>
  );
};

export default Search;
