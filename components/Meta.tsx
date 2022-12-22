import Head from 'next/head';

interface IProps {
  title: string;
  keywords: string;
  description: string;
  image?: string;
}

export default function Meta({ title, keywords, description, image }: IProps) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>CBJ | {title}</title>
      <meta charSet="utf-8" />
      <meta property="og:url" content="https://choi-notion-blog.vercel.app/" />
      <meta property="og:title" content="CBJ blog using notion as a cms" />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={
          image ??
          'https://choi-notion-blog.vercel.app/images/earth-1756274_1920.jpg'
        }
      />
      <meta name="keywords" content={keywords} />
      <meta property="og:site_name" content="CBJ's Notion blog" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@site" />
      <meta name="twitter:creator" content="@handle" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

Meta.defaultProps = {
  keywords: 'web development',
};
