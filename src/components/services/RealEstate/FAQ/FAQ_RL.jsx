import { useState } from "react";
import styles from "./faqRl.module.css";

const faqs = [
  {
    question: "How fast can you build my real estate website?",
    answer:
      "We can deliver your fully functional real estate website in 7–10 business days depending on scope.",
  },
  {
    question: "Will my website be optimized for SEO?",
    answer:
      "Yes, we implement technical SEO, meta tags, schema markup, and local SEO strategies.",
  },
  {
    question: "Do I need to provide my own hosting?",
    answer:
      "We can deploy to your preferred provider or recommend fast, secure hosting options.",
  },
  {
    question: "Can you redesign my existing site?",
    answer:
      "Absolutely. We specialize in performance-focused redesigns that convert better.",
  },
  {
    question: "Will it work perfectly on mobile?",
    answer:
      "100% — all our websites are fully responsive and tested on multiple devices.",
  },
  {
    question: "Can you help me rank on Google Maps?",
    answer:
      "Yes, we implement Google My Business optimization for real estate firms.",
  },
  {
    question: "Do you include lead capture forms?",
    answer:
      "Yes — our websites are designed with CTAs, forms, and automation to collect leads.",
  },
  {
    question: "Do you build custom features (chatbots, booking)?",
    answer:
      "Yes, we can integrate chat widgets, scheduling, or CRM tools depending on your needs.",
  },
  {
    question: "What is your pricing?",
    answer:
      "Our packages start at $299 for basic setups, with custom plans available for advanced features.",
  },
  {
    question: "Will I be able to edit the site later?",
    answer:
      "Yes, you’ll get a CMS or documentation for easy updates. Or we offer monthly support plans.",
  },
  {
    question: "Do you provide content writing too?",
    answer:
      "Yes, we can include high-converting content copy if you prefer hands-off development.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.title}>Answers to Your Most Asked Questions</h2>
      <div className={styles.faqList}>
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${openIndex === index ? styles.open : ""}`}
          >
            <div className={styles.questionRow}>
              <h3 onClick={() => toggle(index)}>{item.question}</h3>
              <button
                onClick={() => toggle(index)}
                className={styles.toggleBtn}
              >
                {openIndex === index ? "↓" : "→"}
              </button>
            </div>
            <div className={styles.answer}>{item.answer}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
