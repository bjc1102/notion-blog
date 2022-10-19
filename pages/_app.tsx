import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/global.css';

import Router, { useRouter } from 'next/router';
import Meta from '../components/Meta';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';
// used for rendering equations (optional)
import 'katex/dist/katex.min.css';
import { RecoilRoot } from 'recoil';
import Landing from '@/components/Landing';

export default function CustomApp({ Component, pageProps }: AppProps) {
  const { pathname, query } = useRouter();

  return (
    <>
      <Meta />
      <Header />
      <RecoilRoot>
        <div className="block bg-primary text-white py-16 font-sans">
          <React.Fragment>
            <Landing image={query.image as string} />
            <Component {...pageProps} />
          </React.Fragment>
        </div>
        <Footer />
      </RecoilRoot>
    </>
  );
}
