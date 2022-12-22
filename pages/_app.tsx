import React from 'react';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ReactQueryDevtools } from 'react-query/devtools';
import { DefaultSeo } from 'next-seo';
import DEFAULT_SEO from '@/utils/SEO';

import '@/styles/global.css';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';
// used for rendering equations (optional)
import 'katex/dist/katex.min.css';
import { RecoilRoot } from 'recoil';

export default function CustomApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <Nav />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <div className="block relative bg-primary text-white font-sans">
              <React.Fragment>
                <DefaultSeo {...DEFAULT_SEO} />
                <Component {...pageProps} />
                <ReactQueryDevtools
                  initialIsOpen={false}
                  position="bottom-right"
                />
              </React.Fragment>
            </div>
            <Footer />
          </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
