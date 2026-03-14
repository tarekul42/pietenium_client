"use client";

import Link from "next/link";
import styles from "./navber.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navber = () => {
  const pathname = usePathname();
  const [aboutListOpen, setAboutListOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pcOpen, setPcOpen] = useState(true);
  const [mobileListOpen, setMobileListOpen] = useState(false);

  //   Navigation activer by routename-->
  const getActive = (route) => {
    return pathname === route || pathname.startsWith(route + "/")
      ? styles.activeNav
      : "";
  };

  //   About Modal Handler ->
  useEffect(() => {
    const handleClickOutsideForAbt = (event) => {
      if (!event.target.closest(`.${styles.aboutListItem}`)) {
        setAboutListOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutsideForAbt);
    return () => {
      document.removeEventListener("click", handleClickOutsideForAbt);
    };
  }, []);

  //   Mobile Nav Modal) Handler -->

  useEffect(() => {
    const handleClickOutsideNavMList = (event) => {
      if (!event.target.closest(`.${styles.navMobail}`)) {
        setMobileListOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutsideNavMList);
    return () => {
      document.removeEventListener("click", handleClickOutsideNavMList);
    };
  }, []);

  //   PC Nav & Mobile Nav handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 780) {
        setMobileOpen(true);
        setPcOpen(false);
      } else {
        setPcOpen(true);
        setMobileOpen(false);
      }
    };

    handleResize(); // Call on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.navber}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>
          <Link href={'/'}>
            <h1>Pietenium!</h1>
          </Link>
        </div>

        {/* Desktop Navbar */}
        <div className={styles.navItems}>
          {pcOpen && (
            <div className={styles.navPc}>
              <ul className={styles.navPList}>
                <li className={getActive("/")}>
                  <Link href="/">
                    <button>Home</button>
                  </Link>
                </li>
                <li className={getActive("/services")}>
                  <Link href="/services">
                    <button>Services</button>
                  </Link>
                </li>
                <li className={getActive("/our-works")}>
                  <Link href="/our-works">
                    <button>Work</button>
                  </Link>
                </li>
                <li className={getActive("/articles")}>
                  <Link href="/articles">
                    <button>Articles</button>
                  </Link>
                </li>
                <li
                  className={`${styles.aboutListItem} ${getActive("/about")}`}
                  onMouseEnter={() => setAboutListOpen(true)}
                  onMouseLeave={() => setAboutListOpen(false)}
                >
                  <button className={styles.navBtn}>
                    About <span className={styles.chevron}>▾</span>
                  </button>
                  <ul
                    className={`${styles.aboutList} ${aboutListOpen ? styles.show : ""
                      }`}
                  >
                    <li className={getActive("/about-us")}>
                      <Link href="/about-us">
                        <button>About Us</button>
                      </Link>
                    </li>
                    <li className={getActive("/about-team")}>
                      <Link href="/about-team">
                        <button>About Team</button>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={getActive("/contact-us")}>
                  <Link href="/contact-us">
                    <button>Contact</button>
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Navbar */}
          {mobileOpen && (
            <div className={styles.navMobail}>
              <div className={styles.mobailNavCntrl}>
                <button onClick={() => setMobileListOpen((prev) => !prev)}>
                  {mobileListOpen ? "❌" : "☰"}
                </button>
              </div>

              <ul
                className={`${styles.mobileMenu} ${mobileListOpen ? styles.mobileListShow : ""
                  }`}
              >
                <li>
                  <Link href="/">
                    <button className={getActive("/")}>Home</button>
                  </Link>
                </li>
                <li>
                  <Link href="/services">
                    <button className={getActive("/services")}>Services</button>
                  </Link>
                </li>
                <li>
                  <Link href="/our-works">
                    <button className={getActive("/our-works")}>Work</button>
                  </Link>
                </li>
                <li>
                  <Link href="/articles">
                    <button className={getActive("/articles")}>Articles</button>
                  </Link>
                </li>
                <li>
                  <Link href="/about-us">
                    <button className={getActive("/about-us")}>About Us</button>
                  </Link>
                </li>
                <li>
                  <Link href="/about-team">
                    <button className={getActive("/about-team")}>
                      About Team
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us">
                    <button className={getActive("/contact-us")}>Contact</button>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navber;
