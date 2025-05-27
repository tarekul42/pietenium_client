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
  return (
    <section className={styles.footer}>
        <Link href={'#'} className={styles.arrowUp}><button><FontAwesomeIcon icon={faArrowUp}/></button></Link>
      <div className={styles.footerUP}>
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <span>|</span>
          <li>
            <Link href={"/services"}>Services</Link>
          </li>
          <span>|</span>
          <li>
            <Link href={"/works"}>Works</Link>
          </li>
          <span>|</span>
          <li>
            <Link href={"/articles"}>Article</Link>
          </li>
          <span>|</span>
          <li>
            <Link href={"/about-us"}>About-US</Link>
          </li>
          <span>|</span>
          <li>
            <Link href={"/about-team"}>Our Team</Link>
          </li>
          <span>|</span>
          <li>
            <Link href={"/contact"}>Contact</Link>
          </li>
        </ul>
      </div>
      <hr />
      <div className={styles.footerMid}>
        <Link href={"#"}>
          <h1 className={styles.logo}>PieTech.io</h1>
          <p>We Build Better.</p>
        </Link>
        <p>
          <strong>Address : </strong>Agarogoan, Dhaka, Bangladesh
        </p>
        <p>
          <strong>Phone :</strong> +8801603070892
        </p>
        <p>
          <strong>Email : </strong>
          <Link href={"mailto:pietech00@gmail.com"}>
            pietech00@gmail.com
          </Link>
        </p>
      </div>
      <hr />
      <div className={styles.footerDown}>
        <Link href={"https://www.facebook.com/PieTech.0/"} target='_blank'>
          <button>
            <FontAwesomeIcon icon={faFacebook} />
          </button>
        </Link>
        <Link href={""}>
          <button>
            <FontAwesomeIcon icon={faLinkedinIn} />
          </button>
        </Link>
        <Link href={"https://www.instagram.com/pietech0/"} target='_blank'>
          <button>
            <FontAwesomeIcon icon={faInstagramSquare} />
          </button>
        </Link>
        <Link href={""}>
          <button>
            <FontAwesomeIcon icon={faXTwitter} />
          </button>
        </Link>
        <Link href={"#"}>
          <button>
            <FontAwesomeIcon icon={faEarthAmericas} />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Footer;
