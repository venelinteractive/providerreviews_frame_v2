import Head from 'next/head';
import styles from './layout.module.css';

const name = 'Provider Name';
export const siteTitle = `Provider Review Summary: ${name}`;

export default function Layout({ children }) {
  return (
    <div className='container mx-auto'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='Provider Review Summary' />

        <meta name='og:title' content={siteTitle} />
      </Head>
      <main className='container mx-auto'>{children}</main>
    </div>
  );
}
