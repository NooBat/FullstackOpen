import Head from 'next/head';

import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.scss';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi I am Nguyễn Trần Khôi, a Computer Science undergraduate who is
          passionate about learning Next.js to become a{' '}
          <strong>Full Stack Developer</strong>
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  );
}
