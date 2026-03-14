import HomeCardSkeleton from "@/components/skeleton/HomeCardSkeleton";
import { api } from "@/data/api";
import { slugify } from "@/utility/slugify";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import styles from "./homeArtWrk.module.css";
import Image from "next/image";
import { useLoading } from "@/customHooks";

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
        <section className={styles.workShow}>
          {projects?.map((data) => {
            const { _id, title, thumbnail } = data;
            // console.log(data);
            const titleLink = slugify(title);
            return (
              <div className={styles.projTemp} key={_id}>
                <Image
                  src={thumbnail?.photo}
                  alt={`${title} image`}
                  width={300}
                  height={200}
                />
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
      <div className={styles.seeAllWork}>
        <Link href={"/our-works"}>
          <button>View all projects</button>
        </Link>
      </div>
    </section>
  );
};

export default HomeWork;
