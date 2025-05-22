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

        <Link href={'/articles'}><button>{'<'}--Back</button></Link>

      <div className={styles.artDetailUp}>
        <h1 id={styles.heading}>{title}</h1>
        <Image src={thumbnail?.photo} width={1070} height={580} alt={title} id={styles.thumbnail} />
        <p id={styles.articleType}>{articleType}</p>
        <div className={styles.hashtags}>
          {hashtags?.map((h, i) => (
            <span key={`${h},${i}`}>#{h}</span>
          ))}
        </div>
        <div
        className="editorContent"
        id={styles.artContent}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      </div>

      <hr id={styles.hr}/>

      <div className={styles.artDetailDown}>
        <CommentArt articleId={_id}/>
      </div>
    </section>
  );
};

export default ArticleDetails;
