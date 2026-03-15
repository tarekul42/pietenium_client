import Link from "next/link";
import styles from "./notFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.glitchWrapper}>
          <h1 className={styles.errorCode}>404</h1>
        </div>
        <h2 className={styles.title}>You&apos;ve drifted into the void.</h2>
        <p className={styles.message}>
          The page you are looking for has been moved, deleted, or never existed
          in this dimension.
        </p>
        <Link href="/" className={styles.homeBtn}>
          Back to Reality
        </Link>
      </div>
      <div className={styles.background}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
      </div>
    </div>
  );
}
