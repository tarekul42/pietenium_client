"use client";

import {
  faChartLine,
  faCode,
  faComments,
  faLifeRing,
  faMobileAlt,
  faProjectDiagram,
  faRocket,
  faServer,
  faShieldAlt,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import TestimonialSlider from "../testimonial/testimonial";
import styles from "./service.module.css";

const Services = () => {
  const servicesData = [
    {
      icon: faCode,
      title: "Custom Web Application Development",
      description:
        "We build tailored web applications that align perfectly with your business goals. Our solutions are fast, scalable, and built using the latest technologies like React, Node.js, and MongoDB.",
    },
    {
      icon: faMobileAlt,
      title: "Responsive UI/UX Design",
      description:
        "We craft intuitive user interfaces that work flawlessly across all devices. Our design process focuses on user behavior, accessibility, and mobile-first performance.",
    },
    {
      icon: faChartLine,
      title: "SEO & Performance Optimization",
      description:
        "Our SEO-first approach ensures your website ranks higher on search engines and loads blazingly fast. Speed, structure, and search engine friendliness are at our core.",
    },
    {
      icon: faShieldAlt,
      title: "Secure Authentication & Authorization",
      description:
        "We implement robust user authentication with OAuth, JWT, and modern session handling. Our security practices follow industry standards to protect user data.",
    },
    {
      icon: faShoppingCart,
      title: "E-commerce Website Development",
      description:
        "We create high-converting e-commerce websites with seamless payment integration and dynamic management. Built for speed, scalability, and mobile responsiveness.",
    },
    {
      icon: faServer,
      title: "API Integration & Backend Services",
      description:
        "We connect your frontend with powerful APIs and reliable backend services. From REST to GraphQL, we build data-driven systems that are secure and efficient.",
    },
  ];

  const workflowSteps = [
    {
      icon: faComments,
      step: "Consultation",
      title: "Understand Your Vision & Goals",
      description:
        "We begin with a deep-dive consultation to understand your business objectives, target audience, and project expectations.",
    },
    {
      icon: faProjectDiagram,
      step: "Planning",
      title: "Crafting a Roadmap to Success",
      description:
        "We create a detailed project plan, including architecture, technology stack, UI/UX wireframes, and timelines.",
    },
    {
      icon: faCode,
      step: "Development",
      title: "Turning Ideas into High-Quality Code",
      description:
        "Using modern frameworks like React and Node.js, we bring your vision to life follow best practices and clean code.",
    },
    {
      icon: faRocket,
      step: "Delivery",
      title: "Deploying Fast, Secure & Optimized Systems",
      description:
        "Before launch, we perform rigorous testing including responsiveness, SEO audits, and speed optimization.",
    },
    {
      icon: faLifeRing,
      step: "Support",
      title: "Ongoing Support & Continuous Growth",
      description:
        "We don't stop at launch. From updates to bug fixes, we ensure your web solution stays fast, secure, and effective.",
    },
  ];

  const whyUs = [
    {
      icon: "🧠",
      title: "Client-First Mindset",
      desc: "We focus on understanding your goals and building around them.",
    },
    {
      icon: "🎯",
      title: "Custom-Tailored Solutions",
      desc: "Every project is unique — so are our strategies.",
    },
    {
      icon: "🛠️",
      title: "Full-Stack Expertise",
      desc: "From frontend finesse to backend power, we cover it all.",
    },
    {
      icon: "⚡",
      title: "Fast & Optimized Websites",
      desc: "Performance is our priority, always lightning fast.",
    },
  ];

  const VIDEO_SRC =
    "https://res.cloudinary.com/dpjrmamby/video/upload/v1746989800/PieTechBanner_ptcgew.mp4";

  return (
    <section className={`${styles.service} animate-fade`}>
      <section className={styles.srvHead}>
        <video
          className={styles.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        <div className={styles.srvHeadCont}>
          <h1>Values That Drive Us</h1>
          <p>
            We believe in transparency, quality, and consistent value for every
            client.
          </p>
        </div>
      </section>

      <section className={styles.srvBody}>
        <div className={styles.srvCont}>
          <h2>Solutions Built for Performance</h2>
          <div className={styles.srvItems}>
            {servicesData.map((item, idx) => (
              <div key={idx} className={styles.cardItem}>
                <span>
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={styles.srvIcon}
                  />
                </span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.workflowSec}>
          <h2 className={styles.workflowHeading}>
            From Concept to Scalable Reality
          </h2>
          <p className={styles.workflowSub}>
            Our outcome-driven process ensures your project is delivered on
            time, within scope, and optimized for success.
          </p>

          <div className={styles.workflowGrid}>
            {workflowSteps.map((item, index) => (
              <div key={index} className={styles.stepCard}>
                <FontAwesomeIcon icon={item.icon} className={styles.stepIcon} />
                <div className={styles.stepNumber}>
                  Step {index + 1}: {item.step}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tesimonial}>
          <TestimonialSlider />
        </div>

        <div className={styles.whyUs}>
          <div className={styles.wuDesc}>
            <h2>💎 Why Choose Pietenium?</h2>
            <p>
              We&apos;re not just developers — we&apos;re your digital growth
              partners, committed to delivering high-quality solutions.
            </p>
            <ul>
              {whyUs.map((item, idx) => (
                <li key={idx}>
                  <strong>
                    {item.icon} {item.title} —{" "}
                  </strong>{" "}
                  {item.desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.heading}>
            Ready to build something extraordinary?
          </h2>
          <Link href="/contact-us" className={styles.btn}>
            Start Your Project
          </Link>
        </div>
      </section>
    </section>
  );
};

export default Services;
