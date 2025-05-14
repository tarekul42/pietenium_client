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

const Contact = () => {
  const [msgData, setMsgData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCollectChangesData = (e) => {
    setMsgData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { name, email, subject, message } = msgData;

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    console.log("Form Data:", msgData);
    console.log("Captcha Token:", captchaValue);

    // TODO: Send both `msgData` and `captchaValue` to backend API for further processing
  };

  return (
    <aside className={styles.contact}>
      <section className={styles.contactHead}>
        <div className={styles.cntcHeadSect}>
          <h1>💼 Start Your Digital Journey</h1>
          <p>
            Tell us about your goals. We'll craft a solution that brings your
            ideas to life, the smart way.
          </p>
        </div>
      </section>

      <section className={styles.contactBody}>
        <div className={styles.cntcBdyImg}>
          <Image src={mailBox} width={300} height={300} alt="mailbox" /> <hr />
          <div className={styles.address}>
            <p>
              <strong>
                <FontAwesomeIcon icon={faLocationPin} /> #432, West Agargoan,
                Agargoan, Dhaka, Bangladesh
              </strong>
            </p>
            <p>
              <strong>
                <FontAwesomeIcon icon={faPhone} /> +8801603070892
              </strong>
            </p>
            <p>
              <FontAwesomeIcon icon={faMessage} />
              <Link href={"mailto:pietech1618@protonmail.com"}>
                <strong>pietech1618@protonmail.com</strong>
              </Link>
            </p>
          </div>
        </div>

        <div className={styles.contactForm}>
          <h2>Get In Touch</h2>
          <hr />
          <form onSubmit={handleSendMessage}>
            <label>
              <span>
                Name<sup>*</sup>:
              </span>
              <input
                type="text"
                name="name"
                placeholder="Your Name..."
                onChange={handleCollectChangesData}
                value={name}
                required
              />
            </label>

            <label>
              <span>
                Email<sup>*</sup>:
              </span>
              <input
                type="email"
                name="email"
                placeholder="Your Email..."
                onChange={handleCollectChangesData}
                value={email}
                required
              />
            </label>

            <label>
              <span>
                Subject<sup>*</sup>:
              </span>
              <input
                type="text"
                name="subject"
                placeholder="Which space type are you interested in...?"
                onChange={handleCollectChangesData}
                value={subject}
                required
              />
            </label>

            <label>
              <span>
                Message<sup>*</sup>:
              </span>
              <textarea
                name="message"
                id={styles.message}
                placeholder="Tell us what you'd like to discuss..."
                onChange={handleCollectChangesData}
                value={message}
                required
              ></textarea>
            </label>

            {/* reCAPTCHA */}
            <ReCAPTCHA
              sitekey="6Ldz_TgrAAAAAGn5B06uIzFEhmk2VVpgPLydH6Yw"
              onChange={(token) => setCaptchaValue(token)}
            />

            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </aside>
  );
};

export default Contact;
