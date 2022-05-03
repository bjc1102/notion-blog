import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import NotionService from '../../services/notion-service';
import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';
import { Pdf } from 'react-notion-x/build/third-party/pdf';

const Post = ({
  recordMap,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        {/* <title>{post.title}</title>
        <meta
          name={'description'}
          title={'description'}
          content={post.description}
        />
        <meta name={'og:title'} title={'og:title'} content={post.title} />
        <meta
          name={'og:description'}
          title={'og:description'}
          content={post.description}
        />
        <meta name={'og:image'} title={'og:image'} content={post.cover} /> */}
      </Head>
      <NotionRenderer
        recordMap={recordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
        }}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  // @ts-ignore
  const recordMap = await notionService.getSingleBlogPost(context.params?.slug);

  if (!recordMap) {
    throw '';
  }

  return {
    props: {
      recordMap,
    },
  };
};

export async function getStaticPaths() {
  const notionService = new NotionService();

  const posts = await notionService.getPublishedBlogPosts();

  // Because we are generating static paths, you will have to redeploy your site whenever
  // you make a change in Notion.
  const paths = posts.map((post) => {
    return `/post/${post.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Post;
