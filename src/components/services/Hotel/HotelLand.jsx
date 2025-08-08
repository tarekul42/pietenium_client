"use client";

import HotelHero from "./Hero/heroHL";
import styles from "./hotelLnd.module.css";

const HotelLand = () => {
  return (
    <aside className={styles.hotelLand}>
      <HotelHero />
    </aside>
  );
};

export default HotelLand;
