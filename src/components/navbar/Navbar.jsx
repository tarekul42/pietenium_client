"use client";

import ThemeToggle from "@/components/theme/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const [aboutListOpen, setAboutListOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pcOpen, setPcOpen] = useState(true);
  const [mobileListOpen, setMobileListOpen] = useState(false);

  //   Navigation activer by routename-->
  const getActive = (route) => {
    const normalizedPath = pathname.replace(/\/$/, "") || "/";
    const normalizedRoute = route.replace(/\/$/, "") || "/";

    return normalizedPath === normalizedRoute ||
      (normalizedRoute !== "/" &&
        normalizedPath.startsWith(normalizedRoute + "/"))
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
    <section className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>
          <Link href={"/"}>
            <h1>Pietenium!</h1>
          </Link>
        </div>

        {/* Desktop Navbar */}
        <div className={styles.navItems}>
          {pcOpen && (
            <div className={styles.navPc}>
              <ul className={styles.navPList}>
                <li className={getActive("/")}>
                  <Link href="/">Home</Link>
                </li>
                <li className={getActive("/services")}>
                  <Link href="/services">Services</Link>
                </li>
                <li className={getActive("/our-works")}>
                  <Link href="/our-works">Portfolio</Link>
                </li>
                <li className={getActive("/articles")}>
                  <Link href="/articles">Insights</Link>
                </li>
                <li className={getActive("/about")}>
                  <Link href="/about">About</Link>
                </li>
                <li className={`${getActive("/contact-us")} ${styles.ctaLink}`}>
                  <Link href="/contact-us">Get Started</Link>
                </li>
                <li>
                  <ThemeToggle />
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
                className={`${styles.mobileMenu} ${
                  mobileListOpen ? styles.mobileListShow : ""
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
                    <button className={getActive("/our-works")}>
                      Portfolio
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/articles">
                    <button className={getActive("/articles")}>Insights</button>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <button className={getActive("/about")}>About</button>
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us">
                    <button
                      className={`${getActive("/contact-us")} ${styles.mobileCta}`}
                    >
                      Get Started
                    </button>
                  </Link>
                </li>
                <li>
                  <ThemeToggle />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
