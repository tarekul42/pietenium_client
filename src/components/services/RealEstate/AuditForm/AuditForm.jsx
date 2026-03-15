"use client";

import ToastP from "@/components/popupToast/ToastP";
import { useCountryCode, useForm, useLoading, useToast } from "@/customHooks";
import { api } from "@/data/api";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useEffect, useState } from "react";
import styles from "./auditForm.module.css";

export default function AuditFormRl() {
  const {
    formData,
    handleChange: formHandleChange,
    setField,
    resetForm,
  } = useForm({
    name: "",
    email: "",
    website: "",
    phone: "",
    message: "",
  });
  const { popInfo, showToast } = useToast();
  const { loading, startLoading, stopLoading } = useLoading();
  const { countryCode: fetchedCountryCode, fetchCountryCode } =
    useCountryCode("+1");

  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const initCountryCode = async () => {
      const code = await fetchCountryCode();
      if (code) {
        setField("phone", code);
      }
    };
    initCountryCode();
  }, [fetchCountryCode, setField]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!value.startsWith(fetchedCountryCode)) return;
    }

    formHandleChange(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading();
    setStatus("loading");

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

      showToast(getData?.message, getData?.success);
      if (getData?.success === true) {
        setTimeout(() => {
          setStatus("success");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      stopLoading();
      resetForm({
        name: "",
        email: "",
        website: "",
        phone: fetchedCountryCode,
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
            <button type="submit" disabled={loading}>
              {loading ? (
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
