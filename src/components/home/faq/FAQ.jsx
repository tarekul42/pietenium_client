"use client";

import { useState } from "react";
import styles from "./faq.module.css";

const faqData = [
  {
    question: "What services does Pietenium provide?",
    answer: "Pietenium offers a comprehensive range of digital services, including modern web application development, SEO optimization, high-speed API integration, and scalable business tools tailored to your needs.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on complexity. A standard website might take 2-4 weeks, while complex business platforms can take 2-3 months. We provide clear timelines during our initial consultation.",
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes, we provide ongoing maintenance and support packages to ensure your digital solutions remain secure, up-to-date, and performing at their best as your business grows.",
  },
  {
    question: "Can you help with existing projects?",
    answer: "Absolutely! We specialize in optimizing and refactoring existing codebases, improving performance, and adding new features to help your current platform reach its full potential.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqHeader}>
        <h2>Frequently Asked Questions</h2>
        <p>Find answers to common questions about our services and process.</p>
      </div>

      <div className={styles.faqGrid}>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${
              activeIndex === index ? styles.active : ""
            }`}
          >
            <button
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className={styles.icon}>▼</span>
            </button>
            <div className={styles.faqAnswer}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
