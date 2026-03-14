"use client";

import { useEffect, useState, useCallback } from "react";
import CountUp from "react-countup";
import styles from "./about.module.css";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/data/api";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import { useLoading } from "@/customHooks";
import {
  faBuilding,
  faGraduationCap,
  faHospitalSymbol,
  faLaptopCode,
  faPalette,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const About = () => {
  const [Members, setMembers] = useState([]);
  const { loading: teamLoading, startLoading, stopLoading } = useLoading();

  const fetchTeamMemberslData = useCallback(async () => {
    startLoading();
    try {
      const response = await fetch(`${api}/team/getMembers`, {
        cache: "no-store",
      });
      const data = await response.json();
      setMembers(data?.members || []);
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    fetchTeamMemberslData();
  }, [fetchTeamMemberslData]);

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
      title: "Years of Experience",
      count: 5,
      description:
        "With 5+ years in the industry, we've evolved with technology trends and market demands, consistently delivering modern solutions.",
    },
  ];

  const industries = [
    { icon: faBuilding, name: "Real Estate" },
    { icon: faHospitalSymbol, name: "Healthcare" },
    { icon: faLaptopCode, name: "Technology" },
    { icon: faGraduationCap, name: "Education" },
    { icon: faPalette, name: "Design" },
    { icon: faUserTie, name: "Corporate" },
  ];

  return (
    <aside className={styles.about}>
      {/* Hero Section */}
      <section className={styles.aboutHeader}>
        <video
          className={styles.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="https://res.cloudinary.com/dpjrmamby/video/upload/v1746989800/PieTechBanner_ptcgew.mp4"
            type="video/mp4"
          />
        </video>
        <div className={styles.overlay} />
        <div className={styles.abtHeadCont}>
          <h1>About Pietenium</h1>
          <p>Innovating Digital Experiences</p>
        </div>
      </section>

      {/* About Content */}
      <section className={styles.aboutBody}>
        <div className={styles.aboutIntro}>
          <h2>Who We Are</h2>
          <p>
            At Pietenium, we don&apos;t just build websites — we engineer exceptional
            digital experiences. We&apos;re a creative tech agency fueled by innovation,
            design, and real-world problem-solving. From agile startups to growing
            scale-ups, we empower businesses with smart, scalable web solutions
            tailored to their goals. Our team blends clean code with creative
            thinking to craft high-performance websites and applications that stand
            out.
          </p>
        </div>

        {/* Stats */}
        <div className={styles.achievements}>
          {achievements.map((achievement, index) => (
            <div key={index} className={styles.achievementCard}>
              <span className={styles.achievementIcon}>{achievement.icon}</span>
              <h3>
                <CountUp end={achievement.count} duration={2} />
                +
              </h3>
              <h4>{achievement.title}</h4>
              <p>{achievement.description}</p>
            </div>
          ))}
        </div>

        {/* Industries */}
        <div className={styles.industrySection}>
          <h2>Industries We Serve</h2>
          <div className={styles.industryGrid}>
            {industries.map((industry, index) => (
              <div key={index} className={styles.industryCard}>
                <FontAwesomeIcon
                  icon={industry.icon}
                  className={styles.industryIcon}
                />
                <span>{industry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={styles.ctaSection}>
          <h2>Want to join our vision?</h2>
          <p>
            We&apos;re always looking for talented minds to help us build the future.
            Let&apos;s create something extraordinary together.
          </p>
          <Link href="/contact-us" className={styles.ctaBtn}>
            Let&apos;s Collaborate
          </Link>
        </div>

        {/* Team Section */}
        <section className={styles.teamSection}>
          <div className={styles.teamHeader}>
            <h2>Meet Our Team</h2>
            <p>The talented people behind our success</p>
          </div>
          <div className={styles.teamGrid}>
            {teamLoading ? (
              <div className={styles.loadingContainer}>
                <SmallLoad />
              </div>
            ) : Members?.length > 0 ? (
              Members.map((data, index) => {
                const { _id, memberName, role, memberProfile } = data;
                return (
                  <article key={_id || index} className={styles.memberCard}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={memberProfile?.photo}
                        width={200}
                        height={200}
                        alt={`${memberName}'s Profile`}
                        className={styles.profileImg}
                      />
                    </div>
                    <div className={styles.memberInfo}>
                      <h3>{memberName}</h3>
                      <p className={styles.memberRole}>{role}</p>
                      <p className={styles.companyName}>Pietenium</p>
                    </div>
                  </article>
                );
              })
            ) : (
              <p className={styles.noMembers}>No team members yet.</p>
            )}
          </div>
        </section>
      </section>
    </aside>
  );
};

export default About;
