import HomeCardSkeleton from "@/components/skeleton/HomeCardSkeleton";
import { useLoading } from "@/customHooks";
import { api } from "@/data/api";
import { slugify } from "@/utility/slugify";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import styles from "./homeArtWrk.module.css";

const HomeWork = () => {
  const [projects, setProjects] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();

  const fetchProjData = useCallback(async () => {
    startLoading();
    try {
      const response = await fetch(`${api}/project/allProjects`, {
        cache: "no-store",
      });
      const response2 = await response.json();
      setProjects(response2?.data?.slice(0, 4));
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    fetchProjData();
  }, [fetchProjData]);

  return (
    <section className={styles.homeWork}>
      <div className={styles.hWrkHead}>
        <h1>Our Latest Projects</h1>
      </div>
      {loading ? (
        <section className={styles.workShow}>
          {[1, 2, 3, 4].map((n) => (
            <HomeCardSkeleton key={n} />
          ))}
        </section>
      ) : (
        <div className={styles.workContainer}>
          {projects.length > 0 && (
            <div className={styles.spotlightProject}>
              <div className={styles.spotlightContent}>
                <span className={styles.spotlightLabel}>Featured Project</span>
                <h2>{projects[0].title}</h2>
                <p>
                  A deep dive into how we solved complex challenges and
                  delivered measurable results for this client.
                </p>
                <Link
                  href={`/work/${slugify(projects[0].title)}/${projects[0]._id}`}
                  className={styles.spotlightLink}
                >
                  Explore Case Study
                </Link>
              </div>
              <div className={styles.spotlightImage}>
                <Image
                  src={projects[0].thumbnail?.photo}
                  alt={projects[0].title}
                  width={800}
                  height={500}
                />
              </div>
            </div>
          )}

          <section className={styles.workShow}>
            {projects?.slice(1).map((data) => {
              const { _id, title, thumbnail } = data;
              const titleLink = slugify(title);
              return (
                <div
                  className={`${styles.projTemp} animate-slide-up`}
                  key={_id}
                >
                  <div className={styles.imgWrapper}>
                    <Image
                      src={thumbnail?.photo}
                      alt={`${title} image`}
                      width={400}
                      height={250}
                    />
                  </div>
                  <div className={styles.projInfo}>
                    <h4>{title}</h4>
                    <Link
                      href={`/work/${titleLink}/${_id}`}
                      className={styles.projectLink}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      )}
      <div className={styles.seeAllWork}>
        <Link href={"/our-works"}>
          <button>View all projects</button>
        </Link>
      </div>
    </section>
  );
};

export default HomeWork;
