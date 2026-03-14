"use client";

import { useState } from "react";
import styles from "./newsletter.module.css";
import { api } from "@/data/api";
import { useLoading } from "@/customHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { loading, startLoading, stopLoading } = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    startLoading();
    setMessage("");

    try {
      const response = await fetch(`${api}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Thanks for subscribing!");
        setEmail("");
      } else {
        setMessage(data.message || "Something went wrong. Try again.");
      }
    } catch (error) {
      setMessage("Failed to subscribe. Please try again.");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className={styles.newsletter}>
      <div className={styles.textContent}>
        <h3>Subscribe to our newsletter</h3>
        <p>Get the latest updates on technology and innovation.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
          disabled={loading}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {message && (
        <p
          className={`${styles.message} ${
            message.includes("Thanks") ? styles.success : styles.error
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Newsletter;
