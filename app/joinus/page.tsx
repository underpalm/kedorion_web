import Footer from '@/components/Footer'
import HamburgerMenu from '@/components/HamburgerMenu'
import styles from '../page.module.css'

export const metadata = { title: 'Join Us – Kedorion' }

export default function JoinUs() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.topLeft}><HamburgerMenu /></div>
        <div className={styles.topCenter}></div>
        <div className={styles.topRight}>
          KEDORION c/o R&amp;D<br />
          Where technology steps back, and<br />
          Humanity steps in.
        </div>
        <div className={styles.heroWrapper}>
          <div className={styles.hero}>
            WE ARE LOOKING FOR PEOPLE WHO BELIEVE THAT<br />
            THE MOST IMPORTANT TECHNOLOGY IS THE KIND<br />
            THAT WORKS RELIABLY IN THE PHYSICAL WORLD
          </div>
          <div className={styles.heroButtons}>
            <a href="mailto:contact@kedorion.io" className={styles.btnPrimary}>Apply Now ↗</a>
            <a href="/mission" className={styles.btnSecondary}>Our Mission</a>
          </div>
        </div>
        <div className={styles.bottomCenter}>JOIN US</div>
      </div>
      <Footer />
    </>
  )
}
