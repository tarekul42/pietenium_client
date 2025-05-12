import styles from "@/components/home/home.module.css";
import Link from "next/link";
import { ReactTyped } from "react-typed";

export default function Hero() {
  return (
    <div className={styles.hero}>
      {/* Background Video */}
      <video className={styles.backgroundVideo} autoPlay muted loop playsInline>
        <source
          src="https://res.cloudinary.com/dpjrmamby/video/upload/v1746989800/PieTechBanner_ptcgew.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Gray Shadow Overlay */}
      <div className={styles.overlay}></div>

      {/* Foreground Content */}
      <div className={styles.heroContent}>
        <div className={styles.heroHeader}>
          <h1>
            Empower Your <span id={styles.brand}>Brand</span> with Digital <br /> Solutions That <span id={styles.growth}>Drive Growth</span>, <br />Authority, and <span id={styles.success}>Success</span>
          </h1>
          <h2>
           <span id={styles.wb}> We Build -</span>
            <ReactTyped
              strings={[
                "Modern Websites.",
                "SEO Optimized Websites",
                "High-Speed APIs.",
                "Secure Admin Panels.",
                "Scalable Business Tools.",
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
          </h2>
        </div>
        <div className={styles.heroCTA}>
          <Link href={'/contact-us'}><button>Let's Start</button></Link>
        </div>
      </div>
    </div>
  );
}
