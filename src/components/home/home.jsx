"use client";
import styles from "./home.module.css";
import Hero from "./hero/hero";
import TrustedComp from "./company/TrustedComp";
import HomeAbout from "./homeAbout/homeBAbout";
import TestimonialSlider from "../testimonial/testimonial";
import Link from "next/link";
import HomeArticle from "./homeArtAndWork/HomeArticle";
import HomeWork from "./homeArtAndWork/HomeWork";

const Home = () => {
 
 
  return (
    <aside className={styles.home}>
      <Hero />
      <TrustedComp />
      <HomeAbout />
      <HomeWork/>
      <HomeArticle/>
      <TestimonialSlider />
      <hr />
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.heading}>
            🚀 Let’s build something amazing together
          </h2>
          <Link href="/contact-us" className={styles.btn}>
            Contact Us
          </Link>
        </div>
      </section>
    </aside>
  );
};
export default Home;
