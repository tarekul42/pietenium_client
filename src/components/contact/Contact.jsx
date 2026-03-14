"use client";
import Image from "next/image";
import styles from "./contact.module.css";
import mailBox from "@/gallary/siteImgs/mailBox.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationPin,
  faMessage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { api } from "@/data/api";
import ToastP from "../popupToast/ToastP";
import SmallLoad from "../smallLaoding/smallLoad";

const Contact = () => {
  const [msgData, setMsgData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [popInfo, setPopInfo] = useState({
    trigger: null,
    type: null,
    message: null,
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCollectChangesData = (e) => {
    setMsgData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { email, subject, name, message } = msgData;

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${api}/sendmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          subject,
          name,
          message,
          token: captchaValue,
        }),
      });
      const data = await res.json();
      setPopInfo({
        trigger: Date.now(),
        type: data?.success,
        message: data?.message,
      });

      if (data?.success) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      console.error("Send failed", err);
    } finally {
      setLoading(false);
    }
  };

  const VIDEO_SRC = "https://res.cloudinary.com/dpjrmamby/video/upload/v1746989800/PieTechBanner_ptcgew.mp4";

  return (
    <aside className={styles.contact}>
      <section className={styles.contactHead}>
        <video
          className={styles.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        <div className={styles.cntcHeadSect}>
          <h1>Start Your Digital Journey</h1>
          <p>
            Tell us about your goals. We'll craft a solution that brings your
            ideas to life, the smart way.
          </p>
        </div>
      </section>

      <section className={styles.contactBody}>
        <div className={styles.cntcBdyImg}>
          <Image src={mailBox} width={300} height={300} alt="mailbox" className={styles.mailboxImg} />
          <div className={styles.address}>
            <p>
              <FontAwesomeIcon icon={faLocationPin} className={styles.icon} />
              <span>#432, West Agargoan, Agargoan, Dhaka, Bangladesh</span>
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className={styles.icon} />
              <span>+8801603070892</span>
            </p>
            <p>
              <FontAwesomeIcon icon={faMessage} className={styles.icon} />
              <Link href={"mailto:pietenium0@gmail.com"}>
                <span>pietenium0@gmail.com</span>
              </Link>
            </p>
          </div>
        </div>

        <div className={styles.contactForm}>
          <h2>Get In Touch</h2>
          <form onSubmit={handleSendMessage} className={styles.formSect}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Name<sup>*</sup></label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  onChange={handleCollectChangesData}
                  value={name}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email<sup>*</sup></label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  onChange={handleCollectChangesData}
                  value={email}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Subject<sup>*</sup></label>
              <input
                type="text"
                name="subject"
                placeholder="How can we help?"
                onChange={handleCollectChangesData}
                value={subject}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Message<sup>*</sup></label>
              <textarea
                name="message"
                id={styles.message}
                placeholder="Tell us about your project..."
                onChange={handleCollectChangesData}
                value={message}
                required
              ></textarea>
            </div>

            <div className={styles.captchaRow}>
              <ReCAPTCHA
                sitekey={"6LfHa1QrAAAAAKFl-0u7ogSQ9DgbI0OPITwXJivc"}
                onChange={(token) => setCaptchaValue(token)}
                theme="dark"
              />
            </div>

            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? <SmallLoad /> : "Send Message"}
            </button>
          </form>
          <ToastP popInfo={popInfo} />
        </div>
      </section>
    </aside>
  );
};

export default Contact;
