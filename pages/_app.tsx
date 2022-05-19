import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/global.css';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';
// used for rendering equations (optional)
import 'katex/dist/katex.min.css';
import Meta from '../components/Meta';

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <Header />
      <div className="block bg-primary text-white py-16 font-sans">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}
