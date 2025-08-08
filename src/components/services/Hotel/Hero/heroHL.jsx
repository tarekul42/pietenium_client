import { useEffect, useState } from "react";
import styles from "./heroHl.module.css";

const HotelHero = () => {
    const images = [
    "/images/hotel1.jpg",
    "/images/hotel2.jpg",
    "/images/hotel3.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.heading}>
            Boost Your Hotel Bookings with a Stunning Website
          </h1>
          <p className={styles.subheading}>
            We create fast, mobile-friendly, booking-ready hotel & restaurant
            websites.
          </p>
          <form className={styles.contactForm}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <button type="submit">Get Free Audit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default heroHL;