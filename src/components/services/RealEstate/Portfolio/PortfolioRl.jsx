import styles from "./prtflRl.module.css";
import { useEffect } from "react";

export default function Portfolio() {
  useEffect(() => {
    const elements = document.querySelectorAll(`.${styles.card}`);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add(styles.visible);
      });
    });
    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <section className={styles.portfolio}>
      <h2 className={styles.heading}>Stories From Clients We&apos;ve Helped</h2>

      <div className={`${styles.card} ${styles.fullWidth}`}>
        <h3>📍 New York, USA – Empire Realty Boost</h3>
        <p>
          <strong>Challenge:</strong> Their website was slow and lacked clear
          CTAs, leading to high bounce rates.
        </p>
        <p>
          <strong>Solution:</strong> We rebuilt it with performance-focused
          components, reduced load time by 62%, and implemented sticky CTAs.
          Their leads tripled within 2 months.
        </p>
      </div>

      <div className={styles.card}>
        <h3>📍 London, UK – London Properties Redesign</h3>
        <p>
          <strong>Challenge:</strong> The site wasn’t mobile optimized and
          ranked poorly for local keywords.
        </p>
        <p>
          <strong>Solution:</strong> We performed a mobile-first redesign,
          restructured the HTML for SEO, and added schema markup. Organic
          traffic increased 87% in 4 weeks.
        </p>
      </div>

      <div className={styles.card}>
        <h3>📍 Toronto, Canada – Toronto Realty Hub</h3>
        <p>
          <strong>Challenge:</strong> Their landing page had 15+ links and no
          clear conversion goal.
        </p>
        <p>
          <strong>Solution:</strong> We created a single CTA-focused funnel,
          simplified the layout, and integrated Calendly. Appointment bookings
          increased 3x.
        </p>
      </div>

      <div className={styles.card}>
        <h3>📍 Miami, USA – LuxePalm Agency Optimization</h3>
        <p>
          <strong>Challenge:</strong> Slow contact form, spam bots, and poor
          mobile UX.
        </p>
        <p>
          <strong>Solution:</strong> We rebuilt the form with anti-spam filters,
          mobile gestures, and optimized server calls. Form conversion rose 40%.
        </p>
      </div>
    </section>
  );
}
