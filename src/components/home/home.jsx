"use client";
import { useState } from "react";
import styles from "./home.module.css";
import Hero from "./hero/hero";
import TrustedComp from "./company/TrustedComp";

const Home = () => {

  return (
    <section className={styles.home}>
      <Hero/>
        <TrustedComp/>
    </section>
  );
};

export default Home;
