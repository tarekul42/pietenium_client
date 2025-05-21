"use client";

import Image from "next/image";
import styles from "./workD.module.css";
import { useState } from "react";
import Link from "next/link";

const WorkDetails = ({ project }) => {
  const { title, details, gallary, pLink } = project ? project : {};
  const [currentImg, setCurrentImg] = useState(0);

  return (
    <div className={styles.container}>
        <Link href='/our-works'><button className={styles.ctaBtn}>{'<'}--Back</button></Link>
      <h1 className={styles.title}>Title : {title}</h1>

      <div className={styles.sliderWrapper}>
        <div className={styles.sliderControls}>
          <button
            onClick={() =>
              setCurrentImg((prev) =>
                prev === 0 ? gallary.length - 1 : prev - 1
              )
            }
          >
            ◀
          </button>
          <span>
            {currentImg + 1} / {gallary.length}
          </span>
          <button
            onClick={() =>
              setCurrentImg((prev) =>
                prev === gallary.length - 1 ? 0 : prev + 1
              )
            }
          >
            ▶
          </button>
        </div>
        <Image
          src={gallary[currentImg].img}
          width={1000}
          height={600}
          alt={`slide-${currentImg + 1}`}
          className={styles.sliderImage}
        />

        <div className={styles.slidCntrlByImg}>
          {gallary?.map((i, idx) => (
            <img
              src={i?.img}
              alt={`slide-${idx + 1}`}
              style={{
                width: "50px",
                height: "30px",
                objectFit: "cover",
                borderRadius: ".2rem",
                border: idx === currentImg ? "2px solid #04cef1" : "",
                cursor: "pointer",
              }}
              onClick={() => setCurrentImg(idx)}
              key={i?.photoId}
            />
          ))}
        </div>
      </div>

      <div className={styles.description}>
        <h3>Description --{">"} </h3>
        {details.split("\r\n").map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>

      <a
        href={pLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.projectBtn}
      >
        Visit Live Site
      </a>

      <div className={styles.ctaBox}>
        <h2>Have a similar project in mind?</h2>
        <p>
          Let's bring your vision to life. Contact us today and get started!
        </p>
        <Link href='/contact-us'><button className={styles.ctaBtn}> Let's Start </button></Link>
      </div>
    </div>
  );
};

export default WorkDetails;
