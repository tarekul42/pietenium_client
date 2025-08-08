import { useState, useEffect, useRef } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import styles from "./auditFrmHtl.module.css";

const AuditFormHotel = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    phone: "",
  });
  const [countryCode, setCountryCode] = useState(""); // +880 etc.
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Detect country via IP geolocation
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country_calling_code) {
          setCountryCode(data.country_calling_code);
          setFormData((prev) => ({
            ...prev,
            phone: data.country_calling_code,
          }));
        }
      })
      .catch(() => {
        // fallback if API fails
        setCountryCode("+1");
        setFormData((prev) => ({ ...prev, phone: "+1" }));
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Prevent removing the country code
      if (!value.startsWith(countryCode)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Optional: format phone properly
    const phoneNumber = parsePhoneNumberFromString(formData.phone);
    if (phoneNumber) {
      formData.phone = phoneNumber.formatInternational();
    }

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", website: "", phone: countryCode });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 2000);
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
          Send us your site → We'll check load speed, SEO, mobile, CTA design →
          You get a full PDF report, free.
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
          </form>
        )}
      </div>
    </section>
  );
};

export default AuditFormHotel;
