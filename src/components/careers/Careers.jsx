"use client";
import {
  faArrowRight,
  faHeart,
  faRocket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./careers.module.css";

const Careers = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Engineer",
      type: "Full-Time",
      location: "Remote / Hybrid",
      category: "Engineering",
    },
    {
      id: 2,
      title: "UI/UX Product Designer",
      type: "Contract",
      location: "Global Remote",
      category: "Design",
    },
    {
      id: 3,
      title: "Digital Strategist",
      type: "Full-Time",
      location: "New York / Remote",
      category: "Business",
    },
  ];

  return (
    <section className={`${styles.careers} animate-fade`}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>Join the Mission</span>
          <h1>Build the Future of Digital Experience</h1>
          <p>
            We are a high-performance team looking for the next generation of
            digital architects and strategic thinkers.
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <section className={styles.values}>
          <div className={styles.valueCard}>
            <FontAwesomeIcon icon={faRocket} className={styles.icon} />
            <h3>Hyper Growth</h3>
            <p>
              Accelerate your career with high-ticket projects and cutting-edge
              tech.
            </p>
          </div>
          <div className={styles.valueCard}>
            <FontAwesomeIcon icon={faUsers} className={styles.icon} />
            <h3>Elite Talent</h3>
            <p>
              Work alongside the best engineers and designers in the industry.
            </p>
          </div>
          <div className={styles.valueCard}>
            <FontAwesomeIcon icon={faHeart} className={styles.icon} />
            <h3>Human Centric</h3>
            <p>
              Competitive rewards, flexible remote culture, and absolute
              ownership.
            </p>
          </div>
        </section>

        <section className={styles.openings}>
          <div className={styles.openingHeader}>
            <h2>Current Openings</h2>
            <p>Explore opportunities to make an impact.</p>
          </div>

          <div className={styles.jobList}>
            {jobs.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobInfo}>
                  <span className={styles.jobCategory}>{job.category}</span>
                  <h3>{job.title}</h3>
                  <div className={styles.jobMeta}>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <Link href="/contact-us" className={styles.applyBtn}>
                  Apply Now <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2>Don&apos;t see a perfect fit?</h2>
            <p>
              We&apos;re always looking for exceptional talent. Send us your
              portfolio and let&apos;s talk.
            </p>
            <Link href="/contact-us" className={styles.generalBtn}>
              General Application
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Careers;
