"use client";

import AuditFormHotel from "./AuditForm/hotelAudit";
import HotelFeature from "./Feature/FeatureHtl";
import HotelHero from "./Hero/heroHL";
import styles from "./hotelLnd.module.css";
import HotelProtfolio from "./Portfolio/PortFolio";
import ProblemHotel from "./Problem/rlprblm";
import SolutionHotel from "./Solution/SolutionHtl";

const HotelLand = () => {
  return (
    <aside className={styles.hotelLand}>
      <HotelHero />
      <ProblemHotel />
      <SolutionHotel />
      <HotelFeature/>
      <HotelProtfolio/>
      <AuditFormHotel/>
    </aside>
  );
};

export default HotelLand;
