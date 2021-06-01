import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import styles from '@/styles/Layout.module.css';


export default function Layout({children }) {
  return (
    <div>
      <Head>
        <title>Product-showcase</title>
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'Product-showcase |showcase products in a video slideshow',
  description: 'showcase products in a video slideshow',
  keywords: 'cloudinary, images, video, slideshow',
};
