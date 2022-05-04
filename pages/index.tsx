import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import landing from '../styles/landing.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>shandilis.dev</title>
        <meta name="description" content="alex's personal portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={landing.header}>Alex Shandilis</h1>
        <h2 className={landing.subheader}>maker of things</h2>

        <div id={"portfolio-container"}>
          <div className={landing.chip_container}>
            <a className={landing.chiplets}>
              JavaScript
            </a>
            <a className={landing.chiplets}>
              Java
            </a>
            <a className={landing.chiplets}>
              C++
            </a>
            <a className={landing.chiplets}>
              Python
            </a>
            <a className={landing.chiplets}>
              Next.js
            </a>
            <a className={landing.chiplets}>
              MongoDB
            </a>
            <a className={landing.chiplets}>
              React
            </a>
            <a className={landing.chiplets}>
              TypeScript
            </a>
            <a className={landing.chiplets}>
              Writing
            </a>
            <a className={landing.chiplets}>
              Environment Design
            </a>
            <a className={landing.chiplets}>
              Games
            </a>
            <a className={landing.chiplets}>
              Demos
            </a>
          </div>
          <div className={landing.content_container}>
            <a className={landing.cards}>
              <img className={landing.card_thumbnail} src={"city.jpg"}></img>
              <div className={landing.card_title}>
                This Website
              </div>
            </a>
            <a className={landing.cards}>
              <img className={landing.card_thumbnail} src={"city.jpg"}></img>
              <div className={landing.card_title}>
                Path Star
              </div>
            </a>
            <a className={landing.cards}>
              <img className={landing.card_thumbnail} src={"city.jpg"}></img>
              <div className={landing.card_title}>
                Missing Sandwich II
              </div>
            </a>
            <a className={landing.cards}>
              <img className={landing.card_thumbnail} src={"city.jpg"}></img>
              <div className={landing.card_title}>
                Annoying Ghosts
              </div>
            </a>
            
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
