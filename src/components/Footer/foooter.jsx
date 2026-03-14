"use client";
import Link from "next/link";
import styles from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagramSquare,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowUp, faEarthAmericas } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <button
        onClick={scrollToTop}
        className={styles.arrowUp}
        aria-label="Back to top"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>

      <div className={styles.footerContent}>
        <div className={styles.footerUP}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/services"}>Services</Link>
            </li>
            <li>
              <Link href={"/works"}>Works</Link>
            </li>
            <li>
              <Link href={"/articles"}>Articles</Link>
            </li>
            <li>
              <Link href={"/about-us"}>About Us</Link>
            </li>
            <li>
              <Link href={"/about-team"}>Our Team</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerMid}>
          <div className={styles.brandSection}>
            <Link href={"/"}>
              <h1 className={styles.logo}>Pietenium.</h1>
              <p className={styles.tagline}>We Strive to Build Better.</p>
            </Link>
          </div>

          <div className={styles.contactSection}>
            <div className={styles.contactItem}>
              <FontAwesomeIcon
                icon={faEarthAmericas}
                className={styles.contactIcon}
              />
              <div>
                <strong>Address</strong>
                <p>Agarogoan, Dhaka, Bangladesh</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <strong>Phone</strong>
              <p>+88101821603355</p>
            </div>
            <div className={styles.contactItem}>
              <strong>Email</strong>
              <Link
                href={"mailto:pietenium0@gmail.com"}
                className={styles.emailLink}
              >
                pietenium0@gmail.com
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.footerDown}>
          <h3>Connect With Us</h3>
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
            <Link href={"/"} aria-label="Website">
              <FontAwesomeIcon icon={faEarthAmericas} />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} Pietenium. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
