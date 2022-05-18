import React from 'react';
import Head from 'next/head';
import { name, description } from '../site.config';

interface IProps {
  keywords: string;
}

export default function Meta({ keywords }: IProps) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{name}</title>
    </Head>
  );
}

Meta.defaultProps = {
  keywords: 'web development',
};
