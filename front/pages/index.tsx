import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zephir Intranet</title>
        <meta name="description" content="Zephir Technical Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/juulieen/zephir-anagram-users"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Julien Ollivier Using Next.js and Nest.js
        </a>
      </footer>
    </div>
  )
}

export default Home
