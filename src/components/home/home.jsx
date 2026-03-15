"use client";
import Link from "next/link";
import TestimonialSlider from "../testimonial/testimonial";
import TrustedComp from "./company/TrustedComp";
import EngagementModels from "./engagement/EngagementModels";
import FAQ from "./faq/FAQ";
import Hero from "./hero/hero";
import styles from "./home.module.css";
import HomeAbout from "./homeAbout/homeBAbout";
import HomeArticle from "./homeArtAndWork/HomeArticle";
import HomeWork from "./homeArtAndWork/HomeWork";
import DevelopmentProcess from "./process/DevelopmentProcess";

const Home = () => {
  return (
    <section className={`${styles.home} animate-fade`}>
      <Hero />
      <TrustedComp />
      <HomeAbout />
      <HomeWork />
      <DevelopmentProcess />
      <EngagementModels />
      <HomeArticle />
      <TestimonialSlider />
      <FAQ />
      <hr />
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.heading}>
            Let’s Build Something Amazing Together
          </h2>
          <Link href="/contact-us" className={styles.btn}>
            Contact Us
          </Link>
        </div>
      </section>
    </section>
  );
};
export default Home;
