import styles from "./tstrl.module.css";

export default function TestimonialsOfRl() {
  const testimonials = [
    {
      name: "Alice Morgan",
      job: "Broker",
      city: "New York, USA",
      review:
        "Their team revamped our outdated site into a lead-generating machine. Absolutely brilliant work!",
    },
    {
      name: "Jean-Luc Dubois",
      job: "Agent",
      city: "Lyon, France",
      review:
        "Super professional. SEO improved and our local traffic skyrocketed within weeks!",
    },
    {
      name: "Sophie Taylor",
      job: "Realtor",
      city: "London, UK",
      review:
        "Loved their communication and delivery. We're now getting 3x the leads.",
    },
    {
      name: "Mark Chen",
      job: "Mortgage Advisor",
      city: "Toronto, Canada",
      review: "Website speed and mobile UX are much better now. Great ROI.",
    },
    {
      name: "Carlos Ramirez",
      job: "Broker",
      city: "Miami, USA",
      review: "Design was clean, responsive, and exactly what we wanted!",
    },
    {
      name: "Fatima Zahra",
      job: "Agent",
      city: "Paris, France",
      review:
        "Their audit was eye-opening. We fixed several things and got more leads!",
    },
    {
      name: "Liam O'Connor",
      job: "Realtor",
      city: "Dublin, Ireland",
      review: "Highly recommend. We saw measurable SEO results fast.",
    },
    {
      name: "Amelia Scott",
      job: "Agent",
      city: "Manchester, UK",
      review: "Best web development agency for real estate hands down!",
    },
  ];

  return (
    <section className={styles.testimonials}>
      <h2 className={styles.title}>What Our Clients Say</h2>
      <div className={styles.carousel}>
        <div className={styles.track}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.card}>
              <p>"{t.review}"</p>
              <h4>
                {t.name} — {t.job}
              </h4>
              <span>{t.city}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
