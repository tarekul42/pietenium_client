import styles from "./rlftr.module.css";

const FeatureRl = () => {
  const features = [
    {
      icon: "🚀",
      title: "Next level Performance",
      description: "Lightning-fast websites that convert visitors into leads",
    },
    {
      icon: "📱",
      title: "Mobile-First Design",
      description: "Perfect experience across all devices and screen sizes",
    },
    {
      icon: "🔍",
      title: "SEO Optimization",
      description: "Rank higher on Google and attract more qualified leads",
    },
    {
      icon: "💼",
      title: "Lead Generation Focus",
      description: "Every element designed to capture and convert prospects",
    },
    {
      icon: "⚡",
      title: "Real-time Updates",
      description: "Instant property updates and dynamic content management",
    },
    {
      icon: "🛡️",
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime guarantee",
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Track performance and optimize for maximum ROI",
    },
    {
      icon: "🎨",
      title: "Custom Branding",
      description: "Unique designs that reflect your brand personality",
    },
    {
      icon: "🔧",
      title: "Easy Management",
      description: "User-friendly admin panel for effortless content updates",
    },
    {
      icon: "💬",
      title: "24/7 Support",
      description: "Dedicated support team always ready to help you succeed",
    },
  ];
  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.sectionTitle}>How We Can Help You Succeed</h2>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
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

export default FeatureRl;
