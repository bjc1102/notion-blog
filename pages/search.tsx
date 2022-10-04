import {GetDatabaseResponse} from '@notionhq/client/build/src/api-endpoints';
import {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next';
import React from 'react';
import SearchIcon from '../public/assets/SearchIcon';
import Input from '../components/Input';

import NotionService from '../services/notion-service';
import {revalidate_time} from '../utils/revalidate';
import {BlogPost} from '../types/schema';
import BlogCardSection from '../components/BlogCardSection';

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
  const [postLists, setPostLists] = React.useState(posts);
  const [searchText, setSearchText] = React.useState('');
  const [selectedTag, setSelecetedTag] = React.useState('');
  //@ts-ignore
  const properties_tag: ITags = property.properties.Tags.multi_select;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
    setSelecetedTag('');
    setPostLists(() => {
      return posts.filter((v) => {
        return v.title.toLowerCase().includes(value.toLowerCase()) && v;
      });
    });
  };

  const handleTagClicK = (TagName: string) => {
    setSearchText('');
    setSelecetedTag(TagName);
    setPostLists(() => {
      return posts.filter((v) => {
        let isTagPost = false;
        for (let i = 0; i < v.tags.length; i++) {
          if (v.tags[i].name === TagName) isTagPost = true;
        }
        return isTagPost && v;
      });
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-24 py-8 px-12 box-border">
      <div className="relative flexCenter overflow-hidden">
        <div className="absolute w-6 h-6 bottom-2 left-3">
          <SearchIcon />
        </div>
        <Input name="search" onChange={handleChange} value={searchText} />
      </div>
      <div className="grid grid-cols-8 lg:grid-cols-4 gap-2 w-full py-10 border">
        {properties_tag.options.map((v) => {
          return (
            <button
              className={`tagContainer flexCenter cursor-pointer focus:ring focus:ring-gray-400 ${
                v.name === selectedTag && 'bg-accent text-gray-200'
              }`}
              key={v.id}
              onClick={() => handleTagClicK(v.name ?? '')}
            >
              {v.name}
            </button>
          );
        })}
      </div>
      <span className="w-full h-px"></span>
      <BlogCardSection posts={postLists} />
    </div>
  );
};

export default Search;
