import { DefaultSeoProps } from 'next-seo';

const SEO: DefaultSeoProps = {
  title: 'Live game',
  description: 'The bettng world.',
  titleTemplate: '%s | Nextjs Core Project',
  openGraph: {
    type: 'website',
    locale: 'en',
    url: 'https://nextjs-core-project.vercel.app',
    siteName: 'Nextjs Core Project',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export { SEO };
