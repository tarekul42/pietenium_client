import { useEffect, useState } from "react";
import styles from "./testimonial.module.css";

const testimonials = [
  {
    name: "James Arthur",
    rating: 5,
    review:
      "Pietenium helped us revamp our entire online presence. Their attention to detail and communication was top-notch.",
  },
  {
    name: "Sophia Reed",
    rating: 4,
    review:
      "They delivered exactly what we needed. Fast, friendly, and effective.",
  },
  {
    name: "Liam Bennett",
    rating: 5,
    review:
      "Working with Pietenium was the best decision for our startup’s website. Highly recommended!",
  },
  {
    name: "Emma Cooper",
    rating: 4,
    review:
      "Design and speed — they nailed both. We’ve seen a 40% boost in user engagement.",
  },
  {
    name: "Oliver Hayes",
    rating: 5,
    review:
      "They understand business goals, not just code. True tech partners!",
  },
  {
    name: "Ava Mitchell",
    rating: 5,
    review:
      "Smooth process and even smoother product. We loved the experience.",
  },
  {
    name: "Ethan Walker",
    rating: 4,
    review:
      "They went the extra mile to deliver on time. Great communication too!",
  },
  {
    name: "Charlotte Harris",
    rating: 5,
    review:
      "A perfect blend of design and development skills. Loved the outcome.",
  },
  {
    name: "Noah Turner",
    rating: 4,
    review: "Support even after launch was incredible. Reliable and smart.",
  },
  {
    name: "Isla Robinson",
    rating: 5,
    review:
      "Their UI/UX skills are impressive. Our users love the new interface.",
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(slide);
  }, []);

  return (
    <section className={styles.testimonialSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>What Our Clients Say</h2>
        <div className={styles.card}>
          <div key={current} className={styles.animateSlide}>
            <p className={styles.review}>“{testimonials[current].review}”</p>
            <div className={styles.client}>
              <h4>{testimonials[current].name}</h4>
              <p className={styles.rating}>
                {Array.from({ length: testimonials[current].rating }).map(
                  (_, i) => (
                    <span key={i}>⭐</span>
                  ),
                )}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.testiCont}>
          {Array.from({ length: testimonials?.length }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.dot} ${idx === current ? styles.dotActive : ""}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
