"use client";

import Image from "next/image";
import styles from "../article.module.css";
import Link from "next/link";
import CommentArt from "../ArticleComment/CommentArt";

const ArticleDetails = ({ data }) => {
  const { _id, title, thumbnail, content, hashtags, articleType } = data
    ? data
    : {};

  return (
    <section className={styles.articleD}>
      <header className={styles.articleHeader}>
        <Image
          src={thumbnail?.photo}
          alt={title || "Article"}
          fill
          className={styles.headerImage}
          priority
        />
        <div className={styles.headerOverlay} />
        <div className={styles.headerContent}>
          <Link href="/articles" className={styles.backLink}>
            ← Back to Articles
          </Link>
          <h1 className={styles.articleTitle}>{title}</h1>
          <div className={styles.articleMeta}>
            {articleType && (
              <span className={styles.articleType}>{articleType}</span>
            )}
            {hashtags && hashtags.length > 0 && (
              <div className={styles.hashtags}>
                {hashtags.map((h, i) => (
                  <span key={`${h},${i}`}>#{h}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className={styles.artDetailUp}>
        <div
          className={styles.artContent}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      <hr className={styles.hr} />

      <div className={styles.artDetailDown}>
        <CommentArt articleId={_id} />

        <div className={styles.ctaBox}>
          <div className={styles.ctaContent}>
            <h3>Enjoyed this article?</h3>
            <p>
              Stay updated with our latest articles, insights, and news.
              Subscribe to our newsletter today!
            </p>
            <Link href="/contact-us" className={styles.ctaBtn}>
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetails;
