import Head from 'next/head';
import type { AppProps } from 'next/app';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../styles/theme';
import { GlobalStyle } from '../styles/global-style';
import { name } from '../site.config';
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';
// used for rendering equations (optional)
import 'katex/dist/katex.min.css';

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{name}</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
