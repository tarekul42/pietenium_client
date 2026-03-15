import { useEffect, useState } from "react";
import styles from "./heroHl.module.css";

const HotelHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "https://i.ibb.co.com/VLK4bsJ/gallery-19.jpg",
    "https://i.ibb.co.com/Lvbs467/gallery-11.jpg",
    "https://i.ibb.co.com/17W6k14/gallery-5.jpg",
    "https://i.ibb.co.com/Kspx982/gallery-2.jpg",
    "https://i.ibb.co.com/2YSVxHs/gallery-3.jpg",
    "https://i.ibb.co.com/Kspx982/gallery-2.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToContact = () => {
    document.getElementById("audit")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className={styles.hero}>
      <div
        className={styles.heroSlider}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={styles.heroSlide}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Boost Your Hotel Bookings and with a Stunning Website
        </h1>
        <p className={styles.heroSubtitle}>
          We build lightning-fast, customer friendly websites that turn your
          sales. Stop losing deals to competitors with outdated sites.
        </p>
        <button className={styles.ctaButton} onClick={scrollToContact}>
          Get Free Website Audit
        </button>
      </div>
    </section>
  );
};

export default HotelHero;
