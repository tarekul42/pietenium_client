"use client";
import {
  faFacebook,
  faInstagramSquare,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowUp, faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Newsletter from "../newsletter/Newsletter";
import styles from "./footer.module.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          {/* Card 1: Brand & Contact (3 parts) */}
          <div className={`${styles.card} ${styles.brandCard}`}>
            <div className={styles.brand}>
              <Link href={"/"}>
                <h1 className={styles.logo}>Pietenium.</h1>
              </Link>
              <p className={styles.tagline}>We Strive to Build Better.</p>
            </div>

            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <FontAwesomeIcon
                  icon={faEarthAmericas}
                  className={styles.icon}
                />
                <p>Agarogoan, Dhaka, Bangladesh</p>
              </div>
              <div className={styles.contactItem}>
                <strong>Tel:</strong>
                <p>+880 1821-603355</p>
              </div>
              <div className={styles.contactItem}>
                <strong>Email:</strong>
                <Link href="mailto:pietenium0@gmail.com">
                  pietenium0@gmail.com
                </Link>
              </div>
            </div>

            <div className={styles.socialIcons}>
              <Link
                href={"https://www.facebook.com/pietenium"}
                target="_blank"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
              <Link
                href={"https://www.linkedin.com/in/heyabdullahbro"}
                target="_blank"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Link>
              <Link
                href={"https://www.instagram.com/pietenium/"}
                target="_blank"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagramSquare} />
              </Link>
              <Link href={"#"} aria-label="Twitter">
                <FontAwesomeIcon icon={faXTwitter} />
              </Link>
            </div>
          </div>

          {/* Card 2: Newsletter (5 parts) */}
          <div className={`${styles.card} ${styles.newsletterCard}`}>
            <div className={styles.newsletterHeader}>
              <h4 className={styles.cardTitle}>Stay Connected</h4>
              <p>
                Subscribe to our newsletter for the latest updates on technology
                and innovation.
              </p>
            </div>
            <div className={styles.newsletterWrapper}>
              <Newsletter />
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Pietenium. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className={styles.backToTop}
            aria-label="Back to top"
          >
            <FontAwesomeIcon icon={faArrowUp} />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
