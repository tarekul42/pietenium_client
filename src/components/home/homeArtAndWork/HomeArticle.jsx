import HomeCardSkeleton from "@/components/skeleton/HomeCardSkeleton";
import { api } from "@/data/api";
import { slugify } from "@/utility/slugify";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import styles from "./homeArtWrk.module.css";
import { useLoading } from "@/customHooks";

const HomeArticle = () => {
  const [articles, setArticles] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();

  const fetchArticles = useCallback(async () => {
    startLoading();
    try {
      const response = await fetch(`${api}/article/getAll`, {
        cache: "no-store",
      });
      const data = await response.json();
      setArticles(data?.articles.slice(0, 4));
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);
  return (
    <section className={styles.homeArticle}>
      <div className={styles.hArtHead}>
        <h1>News & Insights</h1>
      </div>
      {loading ? (
        <div className={styles.articleData}>
          {[1, 2, 3, 4].map((n) => (
            <HomeCardSkeleton key={n} />
          ))}
        </div>
      ) : (
        <div className={styles.articleData}>
          {articles.length > 0 ? (
            <>
              {articles.map((art) => {
                const { _id, title, thumbnail, articleType } = art;
                const titleStr = slugify(title);
                return (
                  <Link
                    key={_id}
                    href={`/pulse/${titleStr}/${_id}`}
                    className={styles.artLink}
                  >
                    <article className={styles.artCont}>
                      <Image
                        src={thumbnail?.photo}
                        width={430}
                        height={230}
                        alt={title}
                      />
                      <p>{articleType}</p>
                      <h4>{title}</h4>
                    </article>
                  </Link>
                );
              })}
            </>
          ) : (
            <p className={styles.emptyState}>No articles found.</p>
          )}
        </div>
      )}
      <div className={styles.seeAllArt}>
        <Link href={"/articles"}>
          <button>View all articles</button>
        </Link>
      </div>
    </section>
  );
};

export default HomeArticle;
