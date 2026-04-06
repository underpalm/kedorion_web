import Footer from '@/components/Footer'
import HamburgerMenu from '@/components/HamburgerMenu'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <div className={styles.page} style={{ background: '#000' }}>
        <video
          className={styles.videoBg}
          src="/video9.mov"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className={styles.videoOverlay} />
        <div className={styles.topLeft}><HamburgerMenu /></div>
        <div className={styles.topCenter}></div>
        <div className={styles.topRight}>
          KEDORION c/o R&amp;D<br />
          Where technology steps back, and<br />
          Humanity steps in.
        </div>
        <div className={styles.heroWrapper}>
          <div className={styles.hero}>
            TECHNOLOGY THAT STEPS BACK,<br />
            SO LIFE HAS SPACE AGAIN.
          </div>
          <div className={styles.heroButtons}>
            <a href="/research" className={styles.btnPrimary}>Discover</a>
            <a href="#contact" className={styles.btnSecondary}>Contact Us</a>
          </div>
        </div>
        <div className={styles.bottomCenter}>HOME</div>
      </div>
      <Footer />
    </>
  )
}
