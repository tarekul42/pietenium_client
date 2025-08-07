"use client";
import { useState, useEffect } from "react";
import styles from "./auditForm.module.css";

export default function AuditForm() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  useEffect(() => {
    const el = document.querySelector(`.${styles.formWrapper}`);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) el.classList.add(styles.visible);
      });
    });
    observer.observe(el);
  }, []);

  return (
    <section className={styles.audit} id="audit">
      <h2>Get a Free Real Estate Website Audit – No Strings Attached!</h2>
      <p>
        Send us your site → We’ll check load speed, SEO, mobile, CTA design →
        You get a full PDF report, free.
      </p>

      <div className={styles.formWrapper}>
        {status === "success" ? (
          <p className={styles.success}>
            ✅ Thank you! We’ll send your audit within 24h.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <input
              type="text"
              name="website"
              placeholder="Website URL"
              required
            />
            <input type="phone" name="phone" placeholder="Phone " required />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
            ></textarea>
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "⏳ Sending..." : "Get My Free Audit"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
