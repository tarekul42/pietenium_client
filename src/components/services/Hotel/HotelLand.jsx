"use client";

import HotelHero from "./Hero/heroHL";
import styles from "./hotelLnd.module.css";
import ProblemHotel from "./Problem/rlprblm";

const HotelLand = () => {
  return (
    <aside className={styles.hotelLand}>
      <HotelHero />
      <ProblemHotel/>
    </aside>
  );
};

export default HotelLand;
