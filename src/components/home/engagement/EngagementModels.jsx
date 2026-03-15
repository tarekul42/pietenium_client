"use client";
import {
  faCheck,
  faHandshake,
  faLayerGroup,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./engagement.module.css";

const EngagementModels = () => {
  const models = [
    {
      icon: faHandshake,
      title: "Strategic Partnership",
      subtitle: "Long-term co-innovation",
      desc: "For companies looking for a dedicated digital partner to build, scale, and evolve their product ecosystem over years.",
      features: [
        "Full Product Lifecycle",
        "Dedicated Lead Architect",
        "Priority 24/7 Support",
      ],
      level: "Elite",
    },
    {
      icon: faLayerGroup,
      title: "Project Based",
      subtitle: "Defined scope, fixed impact",
      desc: "Perfect for specific product launches, MVP development, or focused feature sets with a clear beginning and end.",
      features: [
        "Guaranteed Timeline",
        "Fixed Budget Control",
        "Milestone-Driven Delivery",
      ],
      level: "Focused",
    },
    {
      icon: faUsersViewfinder,
      title: "Dedicated Team",
      subtitle: "Augmented intelligence",
      desc: "Scale your internal capacity with our vetted engineers, designers, and managers who integrate into your workflow.",
      features: [
        "Agile Team Scaling",
        "Seamless Integration",
        "Joint Resource Management",
      ],
      level: "Flexible",
    },
  ];

  return (
    <section className={styles.engagementSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Collaboration</span>
          <h2>Tailored Engagement Models</h2>
          <p>
            Choose the partnership style that best aligns with your business
            velocity and long-term objectives.
          </p>
        </div>

        <div className={styles.grid}>
          {models.map((model, idx) => (
            <div
              key={idx}
              className={`${styles.card} animate-slide-up`}
              style={{ "--delay": `${idx * 0.15}s` }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}>
                  <FontAwesomeIcon icon={model.icon} />
                </div>
                <span className={styles.levelBadge}>{model.level}</span>
              </div>
              <h3>{model.title}</h3>
              <p className={styles.subtitle}>{model.subtitle}</p>
              <p className={styles.desc}>{model.desc}</p>
              <ul className={styles.featureList}>
                {model.features.map((f, i) => (
                  <li key={i}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.checkIcon}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={styles.actionBtn}>Discuss This Model</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagementModels;
