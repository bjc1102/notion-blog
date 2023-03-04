import React from 'react';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { ReactQueryDevtools } from 'react-query/devtools';

import '@/styles/global.css';
import '@/styles/tailwind.style';

export default function CustomApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <Nav />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
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
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
