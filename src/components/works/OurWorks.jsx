"use client";
import { useEffect, useState } from "react";
import styles from "./ourWorks.module.css";
import { api } from "@/data/api";
import Link from "next/link";
import { slugify } from "@/utility/slugify";
import HomeCardSkeleton from "../skeleton/HomeCardSkeleton";

const OurWorks = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}/project/allProjects`, {
        cache: "no-store",
      });
      const response2 = await response.json();
      setProjects(response2?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjData();
  }, []);

  return (
    <aside className={styles.ourWorks}>
      <section className={styles.owHead}>
        {/* Background Video */}
        <video
          className={styles.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://res.cloudinary.com/dpjrmamby/video/upload/v1747678165/workBanner_cjm055.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Gray Shadow Overlay */}
        <div className={styles.overlay}></div>

        {/* Foreground Content */}
        <div className={styles.heroContent}>
          <h1>
            Our Great <span>works</span>
          </h1>
          <p>
            Each project reflects our commitment to quality, <br /> innovation,
            and client satisfaction.
          </p>
        </div>
      </section>

      {loading ? (
        <section className={styles.workShow}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <HomeCardSkeleton key={n} />
          ))}
        </section>
      ) : (
        <section className={styles.workShow}>
          {projects?.map((data) => {
            const { _id, title, thumbnail } = data;
            const titleLink = slugify(title);
            return (
              <div className={styles.projTemp} key={_id}>
                <img src={thumbnail?.photo} alt={`${title} image`} />
                <h4>{title}</h4>
                <Link
                  href={`/work/${titleLink}/${_id}`}
                  className={styles.projectLink}
                >
                  <button>View project</button>
                </Link>
              </div>
            );
          })}
        </section>
      )}
    </aside>
  );
};

export default OurWorks;
