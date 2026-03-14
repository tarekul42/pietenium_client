"use client";
import { useState, useEffect } from "react";
import styles from "./auditForm.module.css";
import { api } from "@/data/api";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import ToastP from "@/components/popupToast/ToastP";

export default function AuditFormRl() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    phone: "",
    message: "",
  });
  const [countryCode, setCountryCode] = useState("+1");
  const [status, setStatus] = useState("idle");

  const [popInfo, setPopInfo] = useState({
    type: null,
    trigger: null,
    message: null,
  });

  // Auto-detect country calling code
  useEffect(() => {
    fetch("https://ipwho.is/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.calling_code) {
          const code = data.calling_code.startsWith("+")
            ? data.calling_code
            : `+${data.calling_code}`;
          setCountryCode(code);
          setFormData((prev) => ({
            ...prev,
            phone: code,
          }));
        }
      })
      .catch(() => {
        setFormData((prev) => ({
          ...prev,
          phone: "+1",
        }));
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Prevent removing country code
      if (!value.startsWith(countryCode)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // Format phone properly before sending
    const phoneNumber = parsePhoneNumberFromString(formData.phone);
    const formattedPhone = phoneNumber
      ? phoneNumber.formatInternational()
      : formData.phone;

    try {
      const res = await fetch(`${api}/realEstate/postdata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: formattedPhone,
        }),
      });

      if (!res.ok) {
        setStatus("error");
      }
      const getData = await res.json();

      setPopInfo({
        trigger: Date.now(),
        type: getData?.success,
        message: getData?.message,
      });
      if (getData?.success === true) {
        setTimeout(() => {
          setStatus("success");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setFormData({
        name: "",
        email: "",
        website: "",
        phone: countryCode,
        message: "",
      });
    }
  };

  // Animate form on scroll
  useEffect(() => {
    const el = document.querySelector(`.${styles.formWrapper}`);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) el.classList.add(styles.visible);
      });
    });
    observer.observe(el);
  }, []);

  return (
    <section className={styles.audit} id="audit">
      <h2>Get a Free Real Estate Website Audit – No Strings Attached!</h2>
      <p>
        Send us your site → We’ll check load speed, SEO, mobile, CTA design →
        You get a full PDF report, free.
      </p>

      <div className={styles.formWrapper}>
        {status === "success" ? (
          <p className={styles.success}>
            ✅ Thank you! We’ll send your audit within 24h.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="website"
              placeholder="Website URL"
              value={formData.website}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? (
                <span className={styles.spinner}></span>
              ) : (
                "Get My Free Audit"
              )}
            </button>
            {status === "error" && (
              <p style={{ color: "red", marginTop: "8px" }}>
                ❌ Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
      <ToastP popInfo={popInfo} />
    </section>
  );
}
