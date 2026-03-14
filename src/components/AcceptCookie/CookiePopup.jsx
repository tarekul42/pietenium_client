"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "./cookiePopup.module.css";
import { api } from "@/data/api";
import SmallLoad from "../smallLaoding/smallLoad";
import { useLoading } from "@/customHooks";

export default function CookiePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const consent = Cookies.get("cookie_accepted");
    if (!consent) {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = async () => {
    startLoading();
    try {
      await fetch(`${api}/userRecord`, {
        method: "POST",
      });
      Cookies.set("cookie_accepted", "true", { expires: 30 });
      setShowPopup(false);
    } catch (error) {
      return;
    } finally {
      stopLoading();
    }
  };

  const handleDecline = async () => {
    startLoading();
    try {
      await fetch(`${api}/userRecord`, {
        method: "POST",
      });
      Cookies.set("cookie_accepted", "true", { expires: 30 });
      setShowPopup(false);
    } catch (error) {
      return;
    } finally {
      stopLoading();
    }
  };

  if (!showPopup) return null;

  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popupBox}>
        <h4>🍪 PieTech Cookie Consent</h4>
        <p>
          We use cookies to improve your experience and analyze traffic on
          PieTech. By clicking &quot;Accept&quot;, you consent to our cookie
          policy. To learn more, see our full policy.
        </p>
        <div className={styles.buttonGroup}>
          {loading ? (
            <SmallLoad />
          ) : (
            <>
              <button
                className={styles.acceptBtn}
                onClick={handleAccept}
                disabled={loading}
              >
                Accept
              </button>
              <button
                className={styles.declineBtn}
                onClick={handleDecline}
                disabled={loading}
              >
                Decline
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
