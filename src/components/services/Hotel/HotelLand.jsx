"use client";

import styles from "./hotelLnd.module.css";

import AuditFormHotel from "./AuditForm/hotelAudit";
import CTA_Hotel from "./CTA_Hotel/CTA_HTL";
import FAQ_Hotel from "./FAQ_HTL/FAQ_HTL";
import HotelFeature from "./Feature/FeatureHtl";
import HotelHero from "./Hero/heroHL";
import HotelProtfolio from "./Portfolio/PortFolio";
import ProblemHotel from "./Problem/rlprblm";
import SolutionHotel from "./Solution/SolutionHtl";
import HotelTestimonials from "./TestmonialHtl/TstmnlHtl";

const HotelLand = () => {
  return (
    <aside className={styles.hotelLand}>
      <HotelHero />
      <hr />
      <ProblemHotel />
      <hr />
      <SolutionHotel />
      <hr />
      <HotelFeature />
      <hr />
      <HotelProtfolio />
      <hr />
      <AuditFormHotel />
      <hr />
      <HotelTestimonials />
      <hr />
      <FAQ_Hotel />
      <hr />
      <CTA_Hotel />
      <hr />
    </aside>
  );
};

export default HotelLand;
