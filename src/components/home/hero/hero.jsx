"use client";

import { useRef, useEffect } from "react";
import styles from "../home.module.css";
import Link from "next/link";
import { ReactTyped } from "react-typed";

const VIDEO_SRC =
  "https://res.cloudinary.com/dpjrmamby/video/upload/v1746989800/PieTechBanner_ptcgew.mp4";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.play().catch(() => {});
    };

    play();
    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);
    video.addEventListener("canplaythrough", play);

    const onVisible = () => {
      if (document.visibilityState === "visible") play();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      video.removeEventListener("canplaythrough", play);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <div className={styles.hero}>
      {/* Background Video */}
      <video
        ref={videoRef}
        className={styles.backgroundVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={VIDEO_SRC} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gray Shadow Overlay */}
      <div className={styles.overlay}></div>

      {/* Foreground Content */}
      <div className={styles.heroContent}>
        <div className={styles.heroHeader}>
          <h1>
            Digital Solutions That Drive{" "}
            <span className={styles.accent}>Growth</span> and Results
          </h1>
          <h2>
            We Build —{" "}
            <ReactTyped
              strings={[
                "Modern Web Apps.",
                "SEO Optimized Websites.",
                "High-Speed APIs.",
                "Secure Admin Panels.",
                "Scalable Business Tools.",
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
          </h2>
          <p className={styles.heroSubhead}>
            Premium digital services tailored to your business goals.
          </p>
        </div>
        <div className={styles.heroCTA}>
          <Link href={"/contact-us"}>
            <button>Get started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
