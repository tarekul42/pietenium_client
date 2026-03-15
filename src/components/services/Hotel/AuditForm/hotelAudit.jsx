import ToastP from "@/components/popupToast/ToastP";
import { useCountryCode, useForm, useLoading, useToast } from "@/customHooks";
import { api } from "@/data/api";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useEffect, useRef, useState } from "react";
import styles from "./auditFrmHtl.module.css";

const AuditFormHotel = () => {
  const { popInfo, showToast } = useToast();
  const { loading, startLoading, stopLoading } = useLoading();
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
  });
  const { countryCode: fetchedCountryCode, fetchCountryCode } =
    useCountryCode("");

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!value.startsWith(fetchedCountryCode)) return;
    }

    formHandleChange(e);
  };

  useEffect(() => {
    const initCountryCode = async () => {
      const code = await fetchCountryCode();
      if (code) {
        setField("phone", code);
      }
    };
    initCountryCode();
  }, [fetchCountryCode, setField]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading();
    setError("");

    let formattedPhone = formData.phone;
    const phoneNumber = parsePhoneNumberFromString(formData.phone);
    if (phoneNumber) {
      formattedPhone = phoneNumber.formatInternational();
    }

    try {
      const res = await fetch(`${api}/hotel/postdata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: formattedPhone,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const getData = await res.json();
      showToast(getData?.message, getData?.success);

      if (getData?.success === true) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong! Try again.");
    } finally {
      stopLoading();
      resetForm({
        name: "",
        email: "",
        website: "",
        phone: fetchedCountryCode,
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.offer} ${sectionVisible ? styles.visible : ""}`}
    >
      <div className={styles.content}>
        <h2 className={styles.headline}>Boost Your Business Performance</h2>
        <p className={styles.subheadline}>
          Get a free professional analysis of your hotel or restaurant website
        </p>

        <div className={styles.offerText}>
          Send us your site → We&apos;ll check load speed, SEO, mobile, CTA
          design → You get a full PDF report, free.
        </div>

        {submitted ? (
          <div className={styles.successMessage}>
            Thank you! Your report is being prepared and will be sent to your
            email shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formField}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="website">
                Website URL (or Social Id. eg;fb, insta, linkedIn)
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? (
                <span className={styles.spinner}></span>
              ) : (
                "Get Your Free Report"
              )}
            </button>
            {error && (
              <p style={{ color: "red", marginTop: "8px" }}>❌ {error}</p>
            )}
          </form>
        )}
      </div>
      <ToastP popInfo={popInfo} />
    </section>
  );
};

export default AuditFormHotel;
