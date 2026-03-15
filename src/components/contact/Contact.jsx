"use client";
import { useForm, useLoading, useToast } from "@/customHooks";
import useFormValidation from "@/customHooks/useFormValidation";
import { api } from "@/data/api";
import mailBox from "@/gallery/siteImgs/mailBox.svg";
import { useThemeStore } from "@/store";
import {
  faLocationPin,
  faMessage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { z } from "zod";
import ToastP from "../popupToast/ToastP";
import SmallLoad from "../smallLaoding/smallLoad";
import styles from "./contact.module.css";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const { formData, handleChange, resetForm } = useForm({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { name, email, subject, message } = formData;
  const { popInfo, showToast } = useToast();
  const { loading, startLoading, stopLoading } = useLoading();
  const { errors, validate, handleBlur, getFieldProps, clearError } =
    useFormValidation(contactSchema);

  const { theme } = useThemeStore();
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const validation = validate({ name, email, subject, message });
    if (!validation.isValid) {
      showToast("Please fix the errors below", false);
      return;
    }

    if (!captchaValue) {
      showToast("Please complete the reCAPTCHA", false);
      return;
    }

    startLoading();
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
      showToast(data?.message, data?.success);

      if (data?.success) {
        setTimeout(() => {
          resetForm();
          setCaptchaValue(null);
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      console.error("Send failed", err);
    } finally {
      stopLoading();
    }
  };

  const VIDEO_SRC =
    "https://res.cloudinary.com/dpjrmamby/video/upload/v1746989800/PieTechBanner_ptcgew.mp4";

  return (
    <section className={`${styles.contact} animate-fade`}>
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
            Tell us about your goals. We&apos;ll craft a solution that brings
            your ideas to life, the smart way.
          </p>
        </div>
      </section>

      <section className={styles.contactBody}>
        <div className={styles.cntcBdyImg}>
          <Image
            src={mailBox}
            width={300}
            height={300}
            alt="mailbox"
            className={styles.mailboxImg}
          />
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
                <label>
                  Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  onChange={(e) => {
                    handleChange(e);
                    clearError("name");
                  }}
                  onBlur={handleBlur}
                  value={name}
                  className={errors.name ? styles.inputError : ""}
                />
                {errors.name && (
                  <span className={styles.errorText}>{errors.name}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  Email<sup>*</sup>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  onChange={(e) => {
                    handleChange(e);
                    clearError("email");
                  }}
                  onBlur={handleBlur}
                  value={email}
                  className={errors.email ? styles.inputError : ""}
                />
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>
                Subject<sup>*</sup>
              </label>
              <input
                type="text"
                name="subject"
                placeholder="How can we help?"
                onChange={(e) => {
                  handleChange(e);
                  clearError("subject");
                }}
                onBlur={handleBlur}
                value={subject}
                className={errors.subject ? styles.inputError : ""}
              />
              {errors.subject && (
                <span className={styles.errorText}>{errors.subject}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>
                Message<sup>*</sup>
              </label>
              <textarea
                name="message"
                id={styles.message}
                placeholder="Tell us about your project..."
                onChange={(e) => {
                  handleChange(e);
                  clearError("message");
                }}
                onBlur={handleBlur}
                value={message}
                className={errors.message ? styles.inputError : ""}
              ></textarea>
              {errors.message && (
                <span className={styles.errorText}>{errors.message}</span>
              )}
            </div>

            <div className={styles.captchaRow}>
              <ReCAPTCHA
                sitekey={"6LfHa1QrAAAAAKFl-0u7ogSQ9DgbI0OPITwXJivc"}
                onChange={(token) => setCaptchaValue(token)}
                theme={theme}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? <SmallLoad /> : "Send Message"}
            </button>
          </form>
          <ToastP popInfo={popInfo} />
        </div>
      </section>
    </section>
  );
};

export default Contact;
