import Head from 'next/head';

interface IProps {
  title: string;
  keywords: string;
  description: string;
}

export default function Meta({ title, keywords, description }: IProps) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>CBJ | {title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

Meta.defaultProps = {
  keywords: 'web development',
};
