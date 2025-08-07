"use client";

import styles from "./rland.module.css";
import RlHero from "./hero/RlHero";
import ProblemRl from "./Problem/rlprblm";
import SolutionRl from "./Solution/SolutionRl";
import FeatureRl from "./Feature/FeatureRl";
import Portfolio from "./Portfolio/PortfolioRl";

const RealEstateLandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <RlHero />

      <ProblemRl />

      <SolutionRl />

      <FeatureRl />

      <Portfolio/>

      {/* CONTACT PLACEHOLDER */}
      <div id="contact" className={styles.contactPlaceholder} />
    </div>
  );
};

export default RealEstateLandingPage;
