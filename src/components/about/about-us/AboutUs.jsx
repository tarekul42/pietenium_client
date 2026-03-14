"use client";

import CountUp from "react-countup";
import styles from "./aboutus.module.css";
import Image from "next/image";
import missionImg from "@/gallary/siteImgs/mission.svg";
import visionImg from "@/gallary/siteImgs/vision.svg";
import {
  faBuilding,
  faGraduationCap,
  faHospitalSymbol,
  faLaptopCode,
  faPalette,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const AboutUs = () => {
  const achievements = [
    {
      icon: "🚀",
      title: "Projects Delivered",
      count: 120,
      description:
        "Successfully completed over 120 custom web projects across diverse industries. Each one is optimized for performance, SEO, and scalability.",
    },
    {
      icon: "🤝",
      title: "Active Clients",
      count: 25,
      description:
        "Currently working with 25+ happy clients worldwide. We focus on long-term partnerships and result-driven solutions.",
    },
    {
      icon: "💬",
      title: "Client Testimonials Received",
      count: 50,
      description:
        "Over 50 satisfied clients shared their positive experiences. From startups to enterprises, our work earns trust and delivers results.",
    },
    {
      icon: "🌍",
      title: "Countries Served",
      count: 12,
      description:
        "Proudly served clients in over 12 countries. Our remote-first approach ensures global collaboration with local care.",
    },
    {
      icon: "📈",
      title: "Average Website Speed Score",
      count: 95,
      description:
        "Most of our projects score 95+ on Google PageSpeed Insights. We optimize for performance, load time, and SEO success.",
    },
    {
      icon: "🔐",
      title: "Secured Platforms Built",
      count: 60,
      description:
        "Built 60+ secure platforms using best practices in authentication, data privacy, and OWASP standards to protect users and data.",
    },
  ];

  //   WHo You help industries Data
  const industries = [
    {
      icon: faUserTie,
      title: "Startups & Entrepreneurs",
      desc: "We help early-stage founders turn ideas into powerful digital products. From MVPs to scale-ready platforms, we build with precision and speed.",
    },
    {
      icon: faHospitalSymbol,
      title: "Healthcare & Medical",
      desc: "We create secure, HIPAA-compliant healthcare apps and websites. Focused on patient experience and performance, every build supports real impact.",
    },
    {
      icon: faBuilding,
      title: "Real Estate & Property",
      desc: "From listings to booking engines, we craft custom platforms for real estate success. Clean design, SEO, and dynamic search come standard.",
    },
    {
      icon: faPalette,
      title: "Creative Agencies",
      desc: "We support creative agencies with dev expertise — delivering flawless frontend, optimized performance, and seamless CMS integration.",
    },
    {
      icon: faLaptopCode,
      title: "SaaS & Tech Products",
      desc: "Our team engineers scalable SaaS solutions using the latest stacks. Secure APIs, smooth UX, and flexible architecture — ready to grow with you.",
    },
    {
      icon: faGraduationCap,

      title: "Education & E-learning",
      desc: "We build student-first platforms for online learning. Interactive, fast, mobile-friendly — everything you need to educate at scale.",
    },
  ];
  return (
    <aside className={styles.aboutUs}>
      <section className={styles.aboutHeader}>
        <div className={styles.abtHeadCont}>
          <h1>Who We Are & What We Stand For</h1>
          <p>Driven by Purpose. Powered by Code.</p>
        </div>
      </section>

      <section className={styles.aboutBody}>
        <div className={styles.achievementContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.preTitle}>Our Impact</span>
            <h2>Proven Results & Milestones</h2>
          </div>
          <div className={styles.achievementGrid}>
            {achievements.map((item, index) => (
              <div key={index} className={styles.achievementCard}>
                <span className={styles.icon}>{item.icon}</span>
                <div className={styles.cardInfo}>
                  <h3>
                    <CountUp start={1} end={item.count} duration={2} /> +
                  </h3>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.whoWeAreContainer}>
          <div className={styles.whoWeAreFlex}>
            <div className={styles.whoWeAreContent}>
              <span className={styles.preTitle}>Our Story</span>
              <h2>Building Digital Experiences That Matter</h2>
              <div className={styles.abtDesc}>
                <p>
                  At <strong>Pietenium</strong>, we don’t just build websites —
                  we engineer exceptional digital experiences. We’re a creative
                  tech agency fueled by innovation, design, and real-world
                  problem-solving.
                </p>
                <p>
                  From agile startups to growing scale-ups, we empower
                  businesses with smart, scalable web solutions tailored to
                  their goals. Our team blends clean code with creative thinking
                  to craft high-performance websites and applications that stand
                  out.
                </p>
                <p>
                  With deep expertise in both frontend finesse and backend
                  reliability, we create systems that are fast, secure, and
                  future-ready. Every product we build is designed with the user
                  in mind — intuitive, responsive, and accessible.
                </p>
                <p>
                  Clients trust us not just for our skills, but for our{" "}
                  <strong>transparency</strong>, <strong>commitment</strong>,
                  and <strong>on-time delivery</strong>. Whether it’s a sleek
                  landing page or a complex SaaS platform, we treat every
                  project like it’s our own.
                </p>
                <p>
                  We stay ahead of emerging technologies to help your business
                  stay ahead of the competition. At Pietenium, communication is
                  clear, collaboration is consistent, and quality is
                  non-negotiable.
                </p>
                <p>
                  We don’t just deliver — we impress, inspire, and drive digital
                  growth.
                </p>
                <p className={styles.finalCall}>
                  <strong>
                    Let’s build something extraordinary — together.
                  </strong>
                </p>
              </div>
            </div>
            <div className={styles.whoWeAreStats}>
              {/* Optional: Add a stylized graphic or additional stats here */}
              <div className={styles.statBox}>
                <span>100%</span>
                <p>Commitment</p>
              </div>
              <div className={styles.statBox}>
                <span>24/7</span>
                <p>Innovation</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.missionVisionContainer}>
          <div className={styles.mission}>
            <div className={styles.mvFlex}>
              <div className={styles.mvImg}>
                <Image
                  src={missionImg}
                  width={500}
                  height={400}
                  alt="Our Mission"
                />
              </div>
              <div className={styles.mvDesc}>
                <span className={styles.preTitle}>Our Purpose</span>
                <h2>Our Mission</h2>
                <p>
                  At <strong>Pietenium</strong>, our mission is to empower
                  businesses by delivering modern, scalable, and user-focused
                  web solutions.
                </p>
                <p>
                  We aim to solve real-world problems through innovation, clean
                  code, and human-centered design. Our team is committed to
                  turning bold ideas into seamless digital products that drive
                  growth and impact.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.vision}>
            <div className={styles.mvFlex}>
              <div className={styles.mvDesc}>
                <span className={styles.preTitle}>Our Future</span>
                <h2>Our Vision</h2>
                <p>
                  We envision a digital landscape where technology and
                  creativity flow seamlessly to create value. Our goal is to be
                  the leading partner for businesses seeking to redefine their
                  digital presence through cutting-edge engineering and artistic
                  design.
                </p>
                <p>
                  By continuously evolving and embracing new technologies, we
                  strive to build a future where every digital interaction is
                  meaningful, accessible, and high-performing.
                </p>
              </div>
              <div className={styles.mvImg}>
                <Image
                  src={visionImg}
                  width={500}
                  height={400}
                  alt="Our Vision"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.whyHelp}>
          <div className={styles.whContainer}>
            <div className={styles.sectionHeader}>
              <span className={styles.preTitle}>Industries & Expertise</span>
              <h2 className={styles.whHeading}>🌍 Who We Help</h2>
              <p className={styles.whSubheading}>
                Tailored digital solutions for every industry we serve.
              </p>
            </div>
            <div className={styles.whGrid}>
              {industries.map((item, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.icon}>
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.desc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaHeading}>
            🚀 Let’s build something awesome
          </h2>
          <p>
            Ready to transform your ideas into reality? Our team is just a click
            away.
          </p>
          <Link href="/contact-us" className={styles.ctaBtn}>
            Start Your Journey
          </Link>
        </div>
      </section>
    </aside>
  );
};

export default AboutUs;
