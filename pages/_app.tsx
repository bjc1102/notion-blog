import React from 'react';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReactQueryDevtools } from 'react-query/devtools';

import '@/styles/global.css';
import Meta from '@/components/Meta';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';
// used for rendering equations (optional)
import 'katex/dist/katex.min.css';
import siteConfig from 'site.config';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';

export default function CustomApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const router = useRouter();
  const exceptRoute = ['/post/[slug]'];

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
            <div className="block relative bg-primary text-white font-sans">
              <React.Fragment>
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
