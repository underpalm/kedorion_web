import Footer from '@/components/Footer'
import HamburgerMenu from '@/components/HamburgerMenu'
import styles from '../page.module.css'

export const metadata = { title: 'Mission – Kedorion' }

export default function Mission() {
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
            KEDORION DEVELOPS INTELLIGENT SYSTEMS THAT ENABLE<br />
            MACHINES TO PRECISELY PERCEIVE THEIR PHYSICAL<br />
            ENVIRONMENT IN REAL TIME AND INTERACT WITH IT SAFELY
          </div>
          <p className={styles.heroSubtitle}>
            We believe technology is at its best when it serves people. Our mission is to develop intelligence that makes physical operations safer, more efficient and more responsive, ultimately to benefit humanity.
          </p>
          <div className={styles.heroButtons}>
            <a href="/joinus" className={styles.btnPrimary}>Contact Us ↗</a>
          </div>
        </div>
        <div className={styles.bottomCenter}>MISSION</div>
      </div>
      <Footer />
    </>
  )
}
