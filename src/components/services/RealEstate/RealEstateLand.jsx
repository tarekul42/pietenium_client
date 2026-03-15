"use client";

import Link from "next/link";
import AuditFormRl from "./AuditForm/AuditForm";
import FaqSection from "./FAQ/FAQ_RL";
import FeatureRl from "./Feature/FeatureRl";
import RlHero from "./hero/RlHero";
import Portfolio from "./Portfolio/PortfolioRl";
import ProblemRl from "./Problem/rlprblm";
import styles from "./rland.module.css";
import SolutionRl from "./Solution/SolutionRl";
import TestimonialsOfRl from "./Testimonial/TestRl";

const RealEstateLandingPage = () => {
  return (
    <aside className={styles.landingPage}>
      <RlHero />
      <ProblemRl />
      <hr className={styles.hr} />

      <SolutionRl />
      <hr className={styles.hr} />

      <FeatureRl />
      <hr className={styles.hr} />

      <Portfolio />
      <hr className={styles.hr} />
      <AuditFormRl />
      <hr className={styles.hr} />
      <TestimonialsOfRl />
      <hr className={styles.hr} />
      <FaqSection />
      <hr className={styles.hr} />

      {/* CONTACT PLACEHOLDER */}
      <section className={styles.cta}>
        <div className={styles.overlay}>
          <h2 className={styles.headline}>
            Let&apos;s Turn Your Website into a Sales Machine
          </h2>
          <p className={styles.subText}>
            Our real estate websites are built to convert — fast loading,
            mobile-first, SEO-powered.
          </p>
          <Link href="/contact-us">
            <button className={styles.ctaBtn}>
              Book Your Free Website Audit
            </button>
          </Link>
        </div>
      </section>
    </aside>
  );
};

export default RealEstateLandingPage;
