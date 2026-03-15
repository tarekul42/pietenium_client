import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./ctaHtl.module.css";

const CTA_Hotel = () => {
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.finalCTA} ${sectionVisible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.headline}>
            Double Your Hotel Bookings in 90 Days — Guaranteed
          </h2>
          <p className={styles.subheadline}>
            Transform your hospitality business with our proven marketing
            strategies
          </p>
          <p className={styles.benefit}>
            Limited spots available this month — secure your free strategy
            session today
          </p>
          <Link href={"/contact-us"}>
            <button className={styles.ctaButton}>
              Get Your Free Strategy Session
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA_Hotel;
