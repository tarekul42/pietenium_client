"use client";

import Image from "next/image";
import styles from "./workD.module.css";
import { useState } from "react";
import Link from "next/link";

const WorkDetails = ({ project }) => {
  const { title, details, gallary, pLink } = project ? project : {};
  const [currentImg, setCurrentImg] = useState(0);

  const currentImage = gallary?.[currentImg];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src={currentImage?.img || gallary?.[0]?.img || "/placeholder.jpg"}
          alt={title || "Project"}
          fill
          className={styles.headerImage}
          priority
        />
        <div className={styles.overlay} />
        <div className={styles.headerContent}>
          <Link href="/our-works" className={styles.backLink}>
            ← Back to Projects
          </Link>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>
            View project details and description below
          </p>
        </div>
      </header>

      <main className={styles.content}>
        <section>
          <h2 className={styles.sectionTitle}>Project Gallery</h2>
          <div className={styles.sliderWrapper}>
            <div className={styles.mainImageContainer}>
              <Image
                src={currentImage?.img}
                alt={`${title} - Image ${currentImg + 1}`}
                fill
                className={styles.mainImage}
                priority
              />
            </div>

            <div className={styles.sliderControls}>
              <button
                className={styles.sliderBtn}
                onClick={() =>
                  setCurrentImg((prev) =>
                    prev === 0 ? gallary.length - 1 : prev - 1,
                  )
                }
                aria-label="Previous image"
              >
                ←
              </button>
              <span className={styles.sliderCounter}>
                {currentImg + 1} / {gallary.length}
              </span>
              <button
                className={styles.sliderBtn}
                onClick={() =>
                  setCurrentImg((prev) =>
                    prev === gallary.length - 1 ? 0 : prev + 1,
                  )
                }
                aria-label="Next image"
              >
                →
              </button>
            </div>

            <div className={styles.thumbnailGrid}>
              {gallary?.map((item, idx) => (
                <div
                  className={`${styles.thumbnail} ${
                    idx === currentImg ? styles.active : ""
                  }`}
                  onClick={() => setCurrentImg(idx)}
                  key={item?.photoId || idx}
                >
                  <Image
                    src={item?.img}
                    alt={`Thumbnail ${idx + 1}`}
                    width={80}
                    height={60}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>Project Description</h2>
          <div className={styles.description}>
            {details?.split("\r\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </section>

        {pLink && (
          <a
            href={pLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.projectLink}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Visit Live Project
          </a>
        )}

        <section className={styles.ctaBox}>
          <div className={styles.ctaContent}>
            <h2>Have a similar project in mind?</h2>
            <p>
              Let&apos;s bring your vision to life. Contact us today and get
              started on your next project!
            </p>
            <Link href="/contact-us" className={styles.ctaBtn}>
              Let&apos;s Start
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WorkDetails;
