import styles from "./sltn.module.css";

const SolutionHotel = () => {
  const hotelSolutions = [
    {
      title: "Ultra-Fast Website Performance",
      description:
        "Optimized sites that load in under 2 seconds to keep guests engaged and prevent drop-offs.",
      icon: "⚡",
    },
    {
      title: "100% Mobile-First Design",
      description:
        "Responsive layouts that look perfect on phones, tablets, and desktops.",
      icon: "📱",
    },
    {
      title: "Visible & Attractive Booking Buttons",
      description:
        "Strategic placement of ‘Book Now’ and ‘Reserve Table’ buttons for higher conversions.",
      icon: "🔖",
    },
    {
      title: "Modern & Trust-Building Design",
      description:
        "Elegant designs tailored to the hospitality industry to boost guest trust.",
      icon: "🎨",
    },
    {
      title: "Direct Booking Engine",
      description:
        "Integrated system to take bookings directly and cut OTA commission costs.",
      icon: "🛎️",
    },
    {
      title: "Advanced SEO for Hospitality",
      description:
        "Rank higher on Google for key hotel and restaurant search terms.",
      icon: "📈",
    },
    {
      title: "Built-In Online Ordering",
      description:
        "Let customers order directly from your restaurant without paying third-party fees.",
      icon: "🛒",
    },
    {
      title: "Simple, Frictionless Booking Forms",
      description:
        "Booking completion in just 2–3 clicks for a smooth user experience.",
      icon: "📝",
    },
    {
      title: "Multilingual Website Support",
      description: "Reach international audiences with multi-language options.",
      icon: "🌐",
    },
    {
      title: "Professional Image Galleries",
      description:
        "High-quality visuals to showcase rooms, dining spaces, and dishes.",
      icon: "📸",
    },
    {
      title: "Integrated Guest Reviews",
      description:
        "Display verified testimonials to build credibility instantly.",
      icon: "⭐",
    },
    {
      title: "Performance Tracking Dashboard",
      description:
        "Real-time analytics to track bookings, visitors, and conversion rates.",
      icon: "📊",
    },
  ];

  return (
    <section className={styles.solutionSection}>
      <h2 className={styles.sectionTitle}>
        How to Overcome Barriers to Bookings!
      </h2>
      <div className={styles.solutionsGrid}>
        {hotelSolutions.map((solution, index) => (
          <div
            key={index}
            className={styles.solutionCard}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={styles.solutionIcon}>{solution.icon}</div>
            <h3 className={styles.solutionTitle}>{solution.title}</h3>
            <p className={styles.solutionDescription}>{solution.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SolutionHotel;
