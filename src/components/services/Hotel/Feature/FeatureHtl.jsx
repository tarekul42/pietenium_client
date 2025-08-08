import styles from "./rlftr.module.css";

const HotelFeature = () => {
  const hotelFeatures = [
    {
      title: "Lightning-Fast Load Times",
      description: "Keep guests engaged with a site that loads instantly.",
      icon: "⚡",
    },
    {
      title: "SEO Optimized",
      description: "Rank higher on Google for more organic traffic.",
      icon: "📈",
    },
    {
      title: "Mobile Responsive",
      description: "Perfect experience across all devices.",
      icon: "📱",
    },
    {
      title: "Direct Booking Engine",
      description: "Reduce dependency on third-party booking sites.",
      icon: "🛎️",
    },
    {
      title: "Multilingual Support",
      description: "Serve global guests in their own language.",
      icon: "🌐",
    },
    {
      title: "Professional Photography",
      description: "Showcase your property with stunning visuals.",
      icon: "📸",
    },
    {
      title: "Integrated Online Ordering",
      description: "Let diners order directly from your site.",
      icon: "🛒",
    },
    {
      title: "Secure Payment Gateway",
      description: "Accept payments safely and securely.",
      icon: "💳",
    },
    {
      title: "Social Media Integration",
      description:
        "Link Instagram, Facebook, and TripAdvisor for social proof.",
      icon: "📲",
    },
    {
      title: "Analytics Dashboard",
      description: "Track performance and guest behavior easily.",
      icon: "📊",
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.sectionTitle}>How We Can Help You Succeed</h2>
      <div className={styles.featuresGrid}>
        {hotelFeatures.map((feature, index) => (
          <div
            key={index}
            className={styles.featureCard}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className={styles.featureIcon}>{feature.icon}</span>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotelFeature;
