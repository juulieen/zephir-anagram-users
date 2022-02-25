import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import ListUser from "../utils/components/ListUser";
import CreateUserForm from "../utils/components/CreateUserForm";

const Home: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>Zephir Intranet</title>
        <meta name="description" content="Zephir Technical Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ListUser />
        <button type="button" onClick={() => setIsModalOpen(true)}>
          Create New User
        </button>
        {isModalOpen && (
          <div className={styles.modal}>
            <h1>Create New User</h1>
            <CreateUserForm />
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        )}
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
  );
};

export default Home;
