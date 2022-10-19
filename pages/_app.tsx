import React from 'react';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Landing from '@/components/Landing';

import '@/styles/global.css';
import Router, { useRouter } from 'next/router';
import Meta from '@/components/Meta';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';
// used for rendering equations (optional)
import 'katex/dist/katex.min.css';
import siteConfig from 'site.config';
import { RecoilRoot } from 'recoil';

export default function CustomApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <Meta
        title={siteConfig.title}
        keywords={siteConfig.keywords}
        description={siteConfig.description}
      />
      <Header />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <div className="block bg-primary text-white py-16 font-sans">
              <React.Fragment>
                {/* <Landing image={query.image as string} /> */}
                <Component {...pageProps} />
              </React.Fragment>
            </div>
            <Footer />
          </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
