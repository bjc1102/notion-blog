import Head from 'next/head';
import type { AppProps } from 'next/app';
import { name } from '../site.config';
import '../styles/global.css';

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{name}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
