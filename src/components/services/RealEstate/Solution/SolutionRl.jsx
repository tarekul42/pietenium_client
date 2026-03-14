import styles from "./sltn.module.css";

const SolutionRl = () => {
  const solutions = [
    {
      icon: "⚡",
      title: "Lightning Fast Loading",
      description:
        "We build websites that load under 2 seconds using Next.js SSR optimization",
    },
    {
      icon: "📱",
      title: "Mobile-First Design",
      description:
        "Perfect mobile experience with instant lead capture forms and touch-friendly navigation",
    },
    {
      icon: "🔍",
      title: "SEO Domination",
      description:
        "Advanced SEO strategies to rank #1 for your local real estate keywords",
    },
    {
      icon: "🚀",
      title: "Strategic CTAs",
      description:
        "Conversion-optimized buttons and forms placed strategically throughout your site",
    },
    {
      icon: "💻",
      title: "Modern, Premium Design",
      description:
        "Stunning, contemporary designs that establish authority and build instant trust",
    },
    {
      icon: "👥",
      title: "Advanced Lead Capture",
      description:
        "Multiple lead magnets, exit-intent popups, and automated follow-up sequences",
    },
    {
      icon: "🏠",
      title: "Intelligent Property Search",
      description:
        "Advanced filtering, saved searches, and property recommendations for buyers",
    },
    {
      icon: "✅",
      title: "Social Proof Integration",
      description:
        "Testimonials, reviews, and success stories prominently displayed for credibility",
    },
    {
      icon: "📧",
      title: "Bulletproof Forms",
      description:
        "100% reliable contact forms with instant notifications and backup systems",
    },
    {
      icon: "📊",
      title: "Advanced Analytics",
      description:
        "Detailed tracking and reporting on leads, traffic sources, and conversion rates",
    },
    {
      icon: "📸",
      title: "Professional Photography",
      description:
        "High-quality image optimization and gallery systems that showcase properties",
    },
    {
      icon: "🔗",
      title: "Seamless Integrations",
      description:
        "Connect with your CRM, email marketing, MLS, and all essential real estate tools",
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      description:
        "Bank-level security protocols to protect your client data and maintain trust",
    },
  ];
  return (
    <section className={styles.solutionSection}>
      <h2 className={styles.sectionTitle}>We Fix Every Problem. Guaranteed!</h2>
      <div className={styles.solutionsGrid}>
        {solutions.map((solution, index) => (
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

export default SolutionRl;
