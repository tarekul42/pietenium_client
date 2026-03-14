import growup from "@/gallary/siteImgs/growup.svg";
import abtImg from "@/gallary/siteImgs/websiteTemp.svg";
import Image from "next/image";
import Link from "next/link";
import styles from "../home.module.css";

const HomeAbout = () => {
  const features = [
    {
      title: "Client-first approach",
      desc: "We align every solution with your business goals and success metrics.",
    },
    {
      title: "Custom solutions",
      desc: "Tailored strategies and builds that fit your unique requirements.",
    },
    {
      title: "Modern UI/UX",
      desc: "Clean, accessible designs that keep users engaged and convert.",
    },
    {
      title: "Performance-focused",
      desc: "Fast, optimized digital products that scale with your growth.",
    },
    {
      title: "SEO and marketing ready",
      desc: "Built for discoverability and conversion from day one.",
    },
    {
      title: "Mobile-first",
      desc: "Consistent, reliable experiences across all devices.",
    },
    {
      title: "Proven results",
      desc: "A track record of delivered projects and long-term client partnerships.",
    },
  ];

  return (
    <section className={styles.homeAbt}>
      <div className={styles.abtSection}>
        <div className={styles.hAbtDesc}>
          <p className={styles.abtLead}>
            We build digital experiences that drive measurable business
            outcomes. From strategy and design to development and launch, we
            combine clarity, quality, and timely delivery so your product stands
            out and performs.
          </p>
          <h3 className={styles.sectionLabel}>What we deliver</h3>
          <ul className={styles.deliverList}>
            <li>Future-ready technology stack</li>
            <li>Bespoke development and design</li>
            <li>Experienced, dedicated team</li>
            <li>Growth-oriented strategy</li>
            <li>Ongoing support and collaboration</li>
          </ul>
        </div>
        <div className={styles.hAbtImg}>
          <Image
            src={abtImg}
            alt="Pietenium digital solutions"
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className={styles.whyUsSec}>
        <div className={styles.wuImg}>
          <Image
            src={growup}
            alt="Growth and results"
            width={300}
            height={300}
          />
        </div>
        <div className={styles.wuDesc}>
          <h2 className={styles.whyTitle}>Why work with us</h2>
          <p className={styles.whyLead}>
            We act as your digital partner: focused on quality, scalability, and
            results. Our team delivers solutions that are built to last and
            supported beyond launch.
          </p>
          <ul className={styles.featureList}>
            {features.map((item, idx) => (
              <li key={idx}>
                <strong>{item.title}</strong> — {item.desc}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.knowMoreBtn}>
        <Link href={"/about-us"}>
          <button>Learn more about us</button>
        </Link>
      </div>
    </section>
  );
};

export default HomeAbout;
