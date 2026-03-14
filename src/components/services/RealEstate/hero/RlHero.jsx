import styles from "./rlHero.module.css";
import { useState, useEffect } from "react";

const RlHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&h=600&fit=crop",
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
          Dominate Real Estate with High-Converting Websites
        </h1>
        <p className={styles.heroSubtitle}>
          We build lightning-fast, lead-generating websites that turn visitors
          into clients. Stop losing deals to competitors with outdated sites.
        </p>
        <button className={styles.ctaButton} onClick={scrollToContact}>
          Get Free Website Audit
        </button>
      </div>
    </section>
  );
};

export default RlHero;
