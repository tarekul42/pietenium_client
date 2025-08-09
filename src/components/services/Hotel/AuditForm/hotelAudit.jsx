import { useState, useEffect, useRef } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import styles from "./auditFrmHtl.module.css";
import { api } from "@/data/api";
import ToastP from "@/components/popupToast/ToastP";

const AuditFormHotel = () => {
  const [popInfo, setPopInfo] = useState({
    type: null,
    trigger: null,
    message: null,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

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

  useEffect(() => {
    fetch("https://ipwho.is/")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.calling_code) {
          const code = data.calling_code.startsWith("+")
            ? data.calling_code
            : `+${data.calling_code}`;
          setCountryCode(code);
          setFormData((prev) => ({ ...prev, phone: code }));
        } else {
          setCountryCode("+1");
          setFormData((prev) => ({ ...prev, phone: "+1" }));
        }
      })
      .catch(() => {
        setCountryCode("+1");
        setFormData((prev) => ({ ...prev, phone: "+1" }));
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Format phone number if possible
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
      setPopInfo({
        trigger: Date.now(),
        type: getData?.success,
        message: getData?.message,
      });

      if (getData?.success === true) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong! Try again.");
    } finally {
      setLoading(false);
      setFormData({ name: "", email: "", website: "", phone: countryCode });
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
