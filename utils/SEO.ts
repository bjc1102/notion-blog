const DEFAULT_SEO = {
  title: 'CBJ Notion blog',
  description: '노션을 CMS로 활용하여 블로그를 개발하였습니다',
  canonical: 'https://choi-notion-blog.vercel.app/',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://choi-notion-blog.vercel.app/',
    title: 'CBJ BLOG Using Notion as a CMS',
    site_name: 'CBJ NOTION BLOG',
    images: [
      {
        url: '../public/images/earth-1756274_1920.jpg',
        width: 285,
        height: 167,
        alt: 'seo-image',
      },
    ],
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default DEFAULT_SEO;
