"use client";

import HotelFeature from "./Feature/FeatureHtl";
import HotelHero from "./Hero/heroHL";
import styles from "./hotelLnd.module.css";
import ProblemHotel from "./Problem/rlprblm";
import SolutionHotel from "./Solution/SolutionHtl";

const HotelLand = () => {
  return (
    <aside className={styles.hotelLand}>
      <HotelHero />
      <ProblemHotel />
      <SolutionHotel />
      <HotelFeature/>
    </aside>
  );
};

export default HotelLand;
