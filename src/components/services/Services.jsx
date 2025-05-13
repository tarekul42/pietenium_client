"use client";

import React from "react";
import styles from "./service.module.css";
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
import TestimonialSlider from "../testimonial/testimonial";
import Link from "next/link";

const Services = () => {
  const servicesData = [
    {
      icon: faCode,
      color: "#007BFF",
      title: "Custom Web Application Development",
      description:
        "We build tailored web applications that align perfectly with your business goals. Our solutions are fast, scalable, and built using the latest technologies like React, Node.js, and MongoDB. From idea to deployment, we ensure your app is responsive, secure, and performance-optimized.",
    },
    {
      icon: faMobileAlt,
      color: "#20C997",
      title: "Responsive UI/UX Design",
      description:
        "We craft intuitive user interfaces that work flawlessly across all devices. Our UI/UX design process focuses on user behavior, accessibility, and mobile-first performance. With modern tools like Figma and Tailwind CSS, we deliver interfaces that convert visitors into customers.",
    },
    {
      icon: faChartLine,
      color: "#FF8800",
      title: "SEO & Performance Optimization",
      description:
        "Our SEO-first approach ensures your website ranks higher on Google and loads blazingly fast. We use best practices like lazy loading, schema markup, and semantic HTML to improve visibility. Speed, structure, and search engine friendliness are at the core of our strategy.",
    },
    {
      icon: faShieldAlt,
      color: "#6F42C1",
      title: "Secure Authentication & Authorization",
      description:
        "We implement robust user authentication with OAuth, JWT, and modern session handling techniques. Our security practices follow OWASP standards to protect user data and prevent unauthorized access. From login flows to admin dashboards, everything is built with safety in mind.",
    },
    {
      icon: faShoppingCart,
      color: "#E83E8C",
      title: "E-commerce Website Development",
      description:
        "We create high-converting e-commerce websites with seamless payment integration and dynamic product management. Our online stores are built for speed, scalability, and mobile responsiveness. Whether you're starting small or scaling big, we build your eCommerce site for success.",
    },
    {
      icon: faServer,
      color: "#17A2B8",
      title: "API Integration & Backend Services",
      description:
        "We connect your frontend with powerful APIs and reliable backend services. From REST to GraphQL, we build data-driven systems that are secure and efficient. Whether it’s third-party integration or custom API development, we ensure smooth communication and fast performance.",
    },
  ];

  //   WorkflowData
  const workflowSteps = [
    {
      icon: faComments,
      step: "Consultation",
      title: "Understand Your Vision & Goals",
      description:
        "We begin with a deep-dive consultation to understand your business objectives, target audience, and project expectations. This helps us align our approach with your brand's vision from day one. Every solution starts with strategic clarity.",
    },
    {
      icon: faProjectDiagram,
      step: "Planning",
      title: "Crafting a Roadmap to Success",
      description:
        "We create a detailed project plan, including architecture, technology stack, UI/UX wireframes, and timelines. This phase ensures both technical and design decisions are aligned for optimal performance. Transparency and structure are key at this stage.",
    },
    {
      icon: faCode,
      step: "Development",
      title: "Turning Ideas into High-Quality Code",
      description:
        "Using modern frameworks like React, Node.js, and Tailwind CSS, we bring your vision to life. Our development process follows best practices including clean code, modular components, and security-first implementation.",
    },
    {
      icon: faRocket,
      step: "Delivery",
      title: "Deploying Fast, Secure & Optimized Systems",
      description:
        "Before launch, we perform rigorous testing including responsiveness, SEO audits, and speed optimization. Then we deploy to a secure production environment with CI/CD workflows. Your site goes live — stable and optimized.",
    },
    {
      icon: faLifeRing,
      step: "Support",
      title: "Ongoing Support & Continuous Growth",
      description:
        "We don’t stop at launch. From updates to bug fixes and performance monitoring, we ensure your web solution stays fast, secure, and effective. Scale confidently with our proactive maintenance and support services.",
    },
  ];

  //   why us-->
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
      icon: "🧩",
      title: "Clean, Scalable Code",
      desc: "Future-proof architecture that grows with your business.",
    },
    {
      icon: "🖌️",
      title: "Modern UI/UX Design",
      desc: "Sleek, user-centric designs that keep people engaged.",
    },
    {
      icon: "⚡",
      title: "Fast & Optimized Websites",
      desc: "Performance is our priority, always lightning fast.",
    },
    {
      icon: "🔍",
      title: "SEO & Marketing Ready",
      desc: "We build with discoverability and conversion in mind.",
    },
    {
      icon: "📱",
      title: "Mobile-First Approach",
      desc: "Seamless experiences across all screen sizes.",
    },
    {
      icon: "🧾",
      title: "Transparent Workflow",
      desc: "You see everything — timelines, milestones, progress.",
    },
    {
      icon: "🛡️",
      title: "Ongoing Support & Maintenance",
      desc: "We don’t vanish after launch — we scale with you.",
    },
    {
      icon: "🚀",
      title: "Tech-Driven Innovation",
      desc: "Always updated with the latest tools and trends.",
    },
    {
      icon: "🏆",
      title: "Proven Track Record",
      desc: "Happy clients, real results, and repeat business.",
    },
  ];

  return (
    <aside className={styles.service}>
      <section className={styles.srvHead}>
        <div className={styles.srvHeadCont}>
          <h1>Values That Drive Us</h1>
          <hr />
          <p>
            We believe in transparency, quality, and consistent value for every
            client.
          </p>
        </div>
      </section>
      <section className={styles.srvBody}>
        <div className={styles.srvCont}>
          <h2>We provide you the best services</h2>
          <hr />
          <div className={styles.srvItems}>
            {servicesData?.map((item, idx) => (
              <article
                key={`${idx}-${item?.title}`}
                className={styles.cardItem}
              >
                <span>
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{ color: item.color }}
                  />
                </span>
                <h4>{item?.title}</h4>
                <p>{item?.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.workflowSec}>
          <h2 className={styles.workflowHeading}>
            How We Turn Ideas into Scalable Web Experiences
          </h2>
          <p className={styles.workflowSub}>
            Our process blends strategy, design, and development to deliver
            high-performing digital solutions — built for growth.
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
            <h2>💎 Why Choose PieTech?</h2>
            <hr />
            <p>
              We’re not just developers — we’re your digital growth partners,
              committed to delivering high-quality, scalable, and smart
              solutions that actually drive results.
            </p>
            <ul>
              {whyUs?.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.icon + item.title} — </strong> {item.desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.heading}>
           🛠️ Need a Custom Web App Built for Your Business?
          </h2>
          <Link href="/contact-us" className={styles.btn}>
            Get in Touch
          </Link>
        </div>
      </section>
    </aside>
  );
};

export default Services;
