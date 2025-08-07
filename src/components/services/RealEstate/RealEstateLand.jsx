"use client";

import styles from "./rland.module.css";
import RlHero from "./hero/RlHero";
import ProblemRl from "./Problem/rlprblm";

const RealEstateLandingPage = () => {
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

  const features = [
    {
      icon: "🚀",
      title: "Next.js Performance",
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
    <div className={styles.landingPage}>
      {/* HERO SECTION */}
      <RlHero />

      {/* PROBLEM SECTION */}
      <ProblemRl />

      {/* SOLUTION SECTION */}
      <section className={styles.solutionSection}>
        <h2 className={styles.sectionTitle}>
          We Fix Every Problem. Guaranteed.
        </h2>
        <div className={styles.solutionsGrid}>
          {solutions.map((solution, index) => (
            <div
              key={index}
              className={styles.solutionCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.solutionIcon}>{solution.icon}</div>
              <h3 className={styles.solutionTitle}>{solution.title}</h3>
              <p className={styles.solutionDescription}>
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>
          Why Choose Our Real Estate Websites?
        </h2>
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

      {/* CONTACT PLACEHOLDER */}
      <div id="contact" className={styles.contactPlaceholder} />
    </div>
  );
};

export default RealEstateLandingPage;
