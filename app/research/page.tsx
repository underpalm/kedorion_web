import Footer from '@/components/Footer'
import HamburgerMenu from '@/components/HamburgerMenu'
import styles from '../page.module.css'

export const metadata = { title: 'Research – Kedorion' }

export default function Research() {
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
            WE INVESTIGATE THE INTERSECTION OF PERCEPTION,<br />
            COGNITION AND PHYSICAL ACTION TO BUILD<br />
            SYSTEMS THAT OPERATE RELIABLY IN THE REAL WORLD
          </div>
          <div className={styles.heroButtons}>
            <a href="/joinus" className={styles.btnPrimary}>Join Us ↗</a>
          </div>
        </div>
        <div className={styles.bottomCenter}>RESEARCH</div>
      </div>
      <Footer />
    </>
  )
}
