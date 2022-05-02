import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import NotionService from '../../services/notion-service';

const Post = ({
  markdown,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name="og:description"
          title="og:description"
          content={post.description}
        />
        <meta name="og:image" title="og:title" content={post.cover} />
      </Head>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </>
  );
};

export default Post;

export async function getStaticPaths() {
  const notionSerivce = new NotionService();
  const posts = await notionSerivce.getPublishedBlogPosts();

  //because we are generating static paths, you will have to redepoly
  //your site when you make a change in Notion.

  const paths = posts.map((post) => {
    return `/post/${post.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();
  // @ts-ignore
  const p = await notionService.getSingleBlogPost(context.params?.slug);

  if (!p) {
    throw 'Error';
  }

  return {
    props: {
      markdow: p.markdown,
      post: p.post,
    },
  };
};
