"use client";
import { useState } from "react";
import styles from "./home.module.css";
import Hero from "./hero/hero";
import TrustedComp from "./company/TrustedComp";
import HomeAbout from "./homeAbout/homeBAbout";
import TestimonialSlider from "../testimonial/testimonial";
import Link from "next/link";

const Home = () => {
  return (
    <section className={styles.home}>
      <Hero />
      <TrustedComp />
      <HomeAbout />
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
    </section>
  );
};
export default Home;
