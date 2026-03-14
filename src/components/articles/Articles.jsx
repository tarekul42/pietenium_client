"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import styles from "./article.module.css";
import { api } from "@/data/api";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/utility/slugify";
import ArticleCardSkeleton from "../skeleton/ArticleCardSkeleton";
import Skeleton from "../skeleton/Skeleton";
import { useLoading } from "@/customHooks";
import Pagination from "../pagination/Pagination";
import usePagination from "@/customHooks/usePagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Articles = () => {
  const [articleType, setArticleType] = useState("");
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, startLoading, stopLoading } = useLoading();
  const { currentPage, paginate, totalPages } = usePagination({ initialLimit: 6 });

  const fetchArticles = useCallback(async (artType) => {
    startLoading();
    try {
      const response = await fetch(
        `${api}/article/getAll?articleType=${artType}`,
        {
          cache: "no-store",
        },
      );
      const data = await response.json();
      setArticles(data?.articles || []);
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    fetchArticles(articleType);
  }, [articleType, fetchArticles]);

  useEffect(() => {
    paginate(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleType]);

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const query = searchQuery.toLowerCase();
    return articles.filter(
      (art) =>
        art.title?.toLowerCase().includes(query) ||
        art.hashtags?.some((h) => h.toLowerCase().includes(query)) ||
        art.articleType?.toLowerCase().includes(query)
    );
  }, [articles, searchQuery]);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * 6;
    const end = start + 6;
    return filteredArticles.slice(start, end);
  }, [filteredArticles, currentPage]);

  const total = totalPages(filteredArticles.length);

  return (
    <aside className={styles.articles}>
      <section className={styles.artlBannerSec}>
        <div className={styles.heroCont}>
          <h1>Insights & News</h1>
          <p>
            Explore our latest thoughts on technology, design, and innovation.
          </p>
        </div>
      </section>
      {loading ? (
        <section className={styles.artlShowSec}>
          <div className={styles.filterBar}>
            <div className={styles.artclAct}>
              <Skeleton
                style={{ width: "6rem", height: "2.5rem", borderRadius: "8px" }}
              />
              <Skeleton
                style={{ width: "6rem", height: "2.5rem", borderRadius: "8px" }}
              />
              <Skeleton
                style={{ width: "6rem", height: "2.5rem", borderRadius: "8px" }}
              />
            </div>
          </div>
          <div className={styles.articleGrid}>
            <div className={styles.gridContainer}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.artlShowSec}>
          <div className={styles.filterBar}>
            <div className={styles.searchWrapper}>
              <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  paginate(1);
                }}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.artclAct}>
              <button
                className={`${articleType === "" && styles.active}`}
                onClick={() => setArticleType("")}
              >
                All posts
              </button>
              <button
                className={`${articleType === "article" && styles.active}`}
                onClick={() => setArticleType("article")}
              >
                Articles
              </button>
              <button
                className={`${articleType === "news" && styles.active}`}
                onClick={() => setArticleType("news")}
              >
                News
              </button>
            </div>
          </div>

          <div className={styles.articleGrid}>
            {paginatedArticles.length > 0 ? (
              <div className={styles.gridContainer}>
                {paginatedArticles.map((art) => {
                  const { _id, title, thumbnail, hashtags, articleType } = art;
                  const titleStr = slugify(title);
                  return (
                    <Link
                      key={_id}
                      href={`/pulse/${titleStr}/${_id}`}
                      className={styles.artLink}
                    >
                      <article className={styles.artCard}>
                        <div className={styles.cardImage}>
                          <Image
                            src={thumbnail?.photo}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt={title}
                          />
                          <span className={styles.categoryBadge}>
                            {articleType}
                          </span>
                        </div>
                        <div className={styles.cardContent}>
                          <h4>{title}</h4>
                          <div className={styles.hashtags}>
                            {hashtags?.slice(0, 3).map((h, i) => (
                              <span key={`${h},${i}`}>#{h}</span>
                            ))}
                          </div>
                          <span className={styles.readMore}>
                            Read article →
                          </span>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>
                  {searchQuery
                    ? `No articles found for "${searchQuery}"`
                    : "No articles or news found matching your selection."}
                </p>
              </div>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={total}
            onPageChange={paginate}
            onPrev={() => paginate(currentPage - 1)}
            onNext={() => paginate(currentPage + 1)}
          />
        </section>
      )}
    </aside>
  );
};

export default Articles;
