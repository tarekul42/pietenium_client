"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import styles from "./ourWorks.module.css";
import { api } from "@/data/api";
import Link from "next/link";
import { slugify } from "@/utility/slugify";
import HomeCardSkeleton from "../skeleton/HomeCardSkeleton";
import Image from "next/image";
import { useLoading } from "@/customHooks";
import Pagination from "../pagination/Pagination";
import usePagination from "@/customHooks/usePagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const OurWorks = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, startLoading, stopLoading } = useLoading();
  const { currentPage, paginate, totalPages } = usePagination({ initialLimit: 6 });

  const fetchProjData = useCallback(async () => {
    startLoading();
    try {
      const response = await fetch(`${api}/project/allProjects`, {
        cache: "no-store",
      });
      const response2 = await response.json();
      setProjects(response2?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    fetchProjData();
  }, [fetchProjData]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const query = searchQuery.toLowerCase();
    return projects.filter(
      (proj) =>
        proj.title?.toLowerCase().includes(query) ||
        proj.description?.toLowerCase().includes(query) ||
        proj.category?.toLowerCase().includes(query)
    );
  }, [projects, searchQuery]);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * 6;
    const end = start + 6;
    return filteredProjects.slice(start, end);
  }, [filteredProjects, currentPage]);

  const total = totalPages(filteredProjects.length);

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
        <>
          <div className={styles.searchWrapper}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                paginate(1);
              }}
              className={styles.searchInput}
            />
          </div>
          {paginatedProjects.length > 0 ? (
            <section className={styles.workShow}>
              {paginatedProjects?.map((data) => {
                const { _id, title, thumbnail } = data;
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
          ) : (
            <div className={styles.emptyState}>
              <p>
                {searchQuery
                  ? `No projects found for "${searchQuery}"`
                  : "No projects found."}
              </p>
            </div>
          )}
          {paginatedProjects.length > 0 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={total}
              onPageChange={paginate}
              onPrev={() => paginate(currentPage - 1)}
              onNext={() => paginate(currentPage + 1)}
            />
          )}
        </>
      )}
    </aside>
  );
};

export default OurWorks;
