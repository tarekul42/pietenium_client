"use client";
import {
  faChess,
  faCode,
  faLightbulb,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./process.module.css";

const DevelopmentProcess = () => {
  const steps = [
    {
      icon: faLightbulb,
      title: "Discovery & Vision",
      desc: "We dive deep into your business goals, target audience, and market challenges to define a winning product vision.",
      color: "#0ea5e9",
    },
    {
      icon: faChess,
      title: "Strategy & Architecture",
      desc: "We map out the technical strategy, choosing the right stack and designing a scalable architecture for future growth.",
      color: "#6366f1",
    },
    {
      icon: faCode,
      title: "Precise Execution",
      desc: "Our engineers build with obsession—clean, modular code combined with intuitive UI/UX that delights users.",
      color: "#a855f7",
    },
    {
      icon: faRocket,
      title: "Launch & Evolution",
      desc: "We don't just ship; we optimize. From SEO audits to performance scaling, we ensure your success is measurable.",
      color: "#22c55e",
    },
  ];

  return (
    <section className={styles.processSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Our Methodology</span>
          <h2>A Proven Path to Digital Excellence</h2>
          <p>
            We&apos;ve distilled our experience into a high-performance
            framework designed to move from idea to impact with surgical
            precision.
          </p>
        </div>

        <div className={styles.grid}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`${styles.stepCard} animate-slide-up`}
              style={{
                "--accent-color": step.color,
                "--delay": `${idx * 0.1}s`,
              }}
            >
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={step.icon} />
                <span className={styles.stepNumber}>0{idx + 1}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              <div className={styles.connector} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentProcess;
