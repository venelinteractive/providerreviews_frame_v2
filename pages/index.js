import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home({}) {
  return (
    <Layout home>
      <Head>
        <title>Provider Review Summaries</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.heading2Xl}>Provider Review Summaries</h1>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}></h2>
        <p></p>
      </section>
    </Layout>
  );
}
