import Image from "next/image";
import styles from "./rlprblm.module.css";

const ProblemRl = () => {
  const problems = [
    {
      title: "Slow Loading Websites",
      description:
        "Your real estate website takes forever to load, losing potential clients every second",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    },
    {
      title: "Poor Mobile Experience",
      description:
        "80% of property searches happen on mobile, but your site isn't optimized",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop",
    },
    {
      title: "Terrible SEO Rankings",
      description:
        "Your competitors appear first on Google while your listings stay buried",
      image:
        "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=300&h=200&fit=crop",
    },
    {
      title: "No Clear Call-to-Actions",
      description:
        "Visitors browse your properties but never contact you or schedule viewings",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=200&fit=crop",
    },
    {
      title: "Outdated Design",
      description:
        "Your website looks like it's from 2010, destroying credibility instantly",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop",
    },
    {
      title: "Missing Lead Capture",
      description:
        "Potential buyers visit but you have no way to follow up with them",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=200&fit=crop",
    },
    {
      title: "Poor Property Search",
      description:
        "Clients can't easily filter and find the properties they're looking for",
      image:
        "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=300&h=200&fit=crop",
    },
    {
      title: "No Social Proof",
      description:
        "Missing testimonials and reviews that build trust with potential clients",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
    },
    {
      title: "Broken Contact Forms",
      description:
        "Your contact forms don't work properly, losing valuable inquiries",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop",
    },
    {
      title: "No Analytics Tracking",
      description:
        "You have no idea which marketing efforts actually generate leads",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    },
    {
      title: "Poor Image Quality",
      description:
        "Blurry, poorly compressed photos make properties look unappealing",
      image:
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=300&h=200&fit=crop",
    },
    {
      title: "No Integration Tools",
      description:
        "Your website doesn't connect with CRM, email marketing, or MLS systems",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    },
    {
      title: "Security Vulnerabilities",
      description:
        "Your site lacks proper security, risking client data and your reputation",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop",
    },
  ];
  return (
    <section className={styles.problemSection}>
      <h2 className={styles.sectionTitle}>
        Is Your Website Costing You Deals?
      </h2>
      <div className={styles.problemsGrid}>
        {problems.map((problem, index) => (
          <div
            key={index}
            className={styles.problemCard}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Image
              width={300}
              height={200}
              src={problem.image}
              alt={problem.title}
              className={styles.problemImage}
            />
            <h3 className={styles.problemTitle}>{problem.title}</h3>
            <p className={styles.problemDescription}>{problem.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProblemRl;
