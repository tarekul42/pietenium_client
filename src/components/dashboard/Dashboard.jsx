import {
  faChartLine,
  faNewspaper,
  faProjectDiagram,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./dashboard.module.css";

const Dashboard = () => {
  return (
    <section className={`${styles.dashboard} animate-fade`}>
      <div className={styles.welcomeSection}>
        <h1>Welcome Back, Commander</h1>
        <p>
          Your digital empire at a glance. Manage projects, insights, and team
          effortlessly.
        </p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FontAwesomeIcon icon={faProjectDiagram} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Active Projects</span>
            <span className={styles.statValue}>12</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FontAwesomeIcon icon={faNewspaper} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Total Articles</span>
            <span className={styles.statValue}>48</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Team Members</span>
            <span className={styles.statValue}>15</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Monthly Growth</span>
            <span className={styles.statValue}>+24%</span>
          </div>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h3>Quick Actions</h3>
        <div className={styles.actionButtons}>
          <button className={styles.actionBtn}>New Project</button>
          <button className={styles.actionBtn}>Post Article</button>
          <button className={styles.actionBtn}>Update Team</button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
