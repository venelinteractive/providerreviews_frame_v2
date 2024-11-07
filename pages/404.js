import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home({}) {
  return (
    <Layout home>
      <Head>
        <title>Provider Not Found</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>404-</h1>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}></h2>
        <p>You have requested a resource that does not exist.</p>
      </section>
    </Layout>
  );
}
