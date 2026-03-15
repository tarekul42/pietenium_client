"use client";
import { useLoading, useToast } from "@/customHooks";
import { api } from "@/data/api";
import {
  faArrowRightFromBracket,
  faBriefcase,
  faFilePen,
  faPeopleGroup,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ToastP from "../popupToast/ToastP";
import SmallLoad from "../smallLaoding/smallLoad";
import styles from "./dashboard.module.css";
import { useDashAuth } from "./DashCotext/DashContext";

const DashboardNav = () => {
  const { accessToken, setAccessToken } = useDashAuth();
  const { loading, startLoading, stopLoading } = useLoading();
  const { popInfo, showToast } = useToast();
  const handleLogOut = async () => {
    startLoading();
    try {
      const response = await fetch(`${api}/admin/logOut`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      showToast(data?.message, data?.success);

      if (data?.success) {
        setTimeout(() => {
          setAccessToken("");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };
  return (
    <nav className={styles.dashboardNav}>
      <section className={styles.dashNavSec}>
        <div className={styles.navBrand}>PieTech HQ</div>
        <ul className={styles.navList}>
          <li>
            <Link href="/dashboard" className={styles.navLink}>
              <FontAwesomeIcon icon={faTableColumns} />
              <span>Overview</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/project" className={styles.navLink}>
              <FontAwesomeIcon icon={faBriefcase} />
              <span>Projects</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/article" className={styles.navLink}>
              <FontAwesomeIcon icon={faFilePen} />
              <span>Articles</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/team" className={styles.navLink}>
              <FontAwesomeIcon icon={faPeopleGroup} />
              <span>Teams</span>
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogOut}
          disabled={loading}
          className={styles.logoutBtn}
          title="Logout"
        >
          {loading ? (
            <SmallLoad />
          ) : (
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          )}
        </button>
      </section>
      <ToastP popInfo={popInfo} />
    </nav>
  );
};

export default DashboardNav;
