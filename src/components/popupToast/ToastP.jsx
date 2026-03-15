"use client";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "./toastP.module.css";

const ToastP = ({ popInfo }) => {
  const { trigger, message, type } = popInfo;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!show) return null;

  return (
    <div
      className={`${styles.popupContainer} ${
        type ? styles.success : styles.error
      }`}
    >
      <div className={styles.popupContent}>
        <FontAwesomeIcon
          icon={type ? faCheckCircle : faTimesCircle}
          className={styles.icon}
        />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ToastP;
