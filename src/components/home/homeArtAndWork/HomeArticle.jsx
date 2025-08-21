import { api } from "@/data/api";
import styles from "./homeArtWrk.module.css";
import { useEffect, useState } from "react";
import { slugify } from "@/utility/slugify";
import Link from "next/link";
import Image from "next/image";
import SmallLoad from "@/components/smallLaoding/smallLoad";

const HomeArticle = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}/article/getAll`, {
        cache: "no-store",
      });
      const data = await response.json();
      setArticles(data?.articles.slice(0, 4));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <section className={styles.homeArticle}>
      <div className={styles.hArtHead}>
        <h1>📰 News & Article</h1>
      </div>
      {loading ? (
        <SmallLoad />
      ) : (
        <div className={styles.articleData}>
          {articles.length > 0 ? (
            <>
              {articles.map((art) => {
                const { _id, title, thumbnail, articleType } = art;
                const titleStr = slugify(title);
                return (
                  <Link key={_id} href={`/pulse/${titleStr}/${_id}`}>
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
            <p>{"No Artilcle/News Found"}</p>
          )}
        </div>
      )}
      <div className={styles.seeAllArt}>
        <Link href={"/articles"}>
          <button className="seeAllArtBtn">See All Article</button>
        </Link>
      </div>
    </section>
  );
};

export default HomeArticle;
