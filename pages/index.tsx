import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import landing from '../styles/landing.module.css'
import Script from 'next/script'

console.log("index.tsx");
console.log("hello from inside my website");

function card(title:string, thumbnail:string, url:string) {
  return  <a href={url}>
            <Image className={landing.card_thumbnail} src={thumbnail}></Image>
            <div className={landing.card_title}>
              {title}
            </div>
          </a>;
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>shandilis.dev</title>
        <meta name="description" content="alex's personal portfolio" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="stylesheet" href="main.css"/> */}

      </Head>
      <Script id="set-export">
        {`var exports = {}; console.log("testy test")`}
      </Script>
      <Script src="js/simple.js"/>
      <Script src="js/map.js"/>
      <Script src="js/main.js"/>
      <main className={styles.main}>
        <h1 className={landing.header}>Alex Shandilis</h1>
        <h2 className={landing.subheader}>maker of things</h2>
        <h3 className={landing.h3}>find me at these places!</h3>
        <div className={landing.chip_container} id="social_links">
          <a className={landing.social_links} href="https://github.com/genericallynamed">
            <object data="icons/github.svg" type="image/svg+xml" style={{height:0.9 + 'em'}}></object>github
          </a>
          <a  className={landing.social_links} href="https://www.linkedin.com/in/alex-shandilis-156376210/">
            <object data="icons/linkedin.svg" type="image/svg+xml"></object>link me on linkedin
          </a>
        </div>
        <h3 className={landing.h3}>or check out my projects below:</h3>
        <div id={"portfolio-container"}>
          <div className={landing.chip_container} id="chiplet-container">
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
          <div className={landing.content_container} id="card-container">            
          </div>
        </div>
      </main>
    </div>
  )
}


export default Home
