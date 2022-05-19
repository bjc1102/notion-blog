import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/global.css';

import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';
// used for rendering equations (optional)
import 'katex/dist/katex.min.css';
import Meta from '../components/Meta';
import Skeleton from '../components/Skeleton';

export default function CustomApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const start = () => {
      // NProgress.start();
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
      <div className="block bg-primary text-white py-16 font-sans">
        {isLoading ? <Skeleton /> : <Component {...pageProps} />}
      </div>
      <Footer />
    </>
  );
}
