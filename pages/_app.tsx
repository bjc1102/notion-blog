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
import Skeleton from '../components/Skeleton';
import { RecoilRoot } from 'recoil';
import Landing from '../components/Landing';

export default function CustomApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { pathname, query } = useRouter();

  useEffect(() => {
    const start = () => {
      // NProgress.start();
      window.scrollTo(0, 0);
      setIsLoading(true);
    };
    const end = () => {
      // NProgress.done();
      setIsLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      <Meta />
      <Header />
      <RecoilRoot>
        <div className="block bg-primary text-white py-16 font-sans">
          {isLoading && pathname !== '/post/[slug]' ? (
            <Skeleton />
          ) : (
            <React.Fragment>
              <Landing image={query.image as string} />
              <Component {...pageProps} />
            </React.Fragment>
          )}
        </div>
        <Footer />
      </RecoilRoot>
    </>
  );
}
