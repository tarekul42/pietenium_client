import Image from "next/image";
import styles from "./hlPrblm.module.css";

const ProblemHotel = () => {
  const hotelProblems = [
    {
      title: "Slow Website Speed is Losing You Bookings",
      description:
        "Guests leave if your site takes more than 3 seconds to load — every second delay costs you reservations.",
      image: "https://i.ibb.co/m5CSVwh4/Slow.png",
    },
    {
      title: "No Mobile Optimization Means Lost Traffic",
      description:
        "Over 60% of travelers book hotels & restaurants from mobile. A non-responsive site drives them away.",
      image: "https://i.ibb.co/27YD0vdh/no-mobile.png",
    },
    {
      title: "Hidden Booking or Reservation Button",
      description:
        "If guests can't easily find your booking button, they'll move to competitors instantly.",
      image: "https://i.ibb.co/wNCbTHGd/no-booking-btn.png",
    },
    {
      title: "Outdated Website Design Hurts Trust",
      description:
        "A decade-old design makes your hotel or restaurant appear less professional and untrustworthy.",
      image: "https://i.ibb.co/BVxM5rNf/outdated-design.png",
    },
    {
      title: "High Commission Fees to OTAs",
      description:
        "Depending on third-party booking sites like Booking.com eats into your profit margins.",
      image: "https://i.ibb.co/tT0DH5v1/ota-fees.png",
    },
    {
      title: "Poor SEO — Invisible on Google",
      description:
        "Without proper SEO, you won’t appear in searches like ‘best hotel near me’ or ‘restaurant in [city]’.",
      image: "https://i.ibb.co/7Jg9GTyK/no-seo.png",
    },
    {
      title: "No Direct Online Ordering",
      description:
        "Restaurants lose money by depending only on food delivery apps that charge huge commissions.",
      image: "https://i.ibb.co/qLz8KRzr/no-online-order.png",
    },
    {
      title: "Complex or Broken Booking Forms",
      description:
        "Guests abandon the process if booking takes more than a few simple clicks.",
      image: "https://i.ibb.co/MDp7tnvT/broker-forms.png",
    },
    {
      title: "No Multilingual Support",
      description:
        "International tourists can’t understand your content, resulting in missed opportunities.",
      image: "https://i.ibb.co/v6zZb7Hc/no-multilingual.png",
    },
    {
      title: "Poor Photo Quality",
      description:
        "Low-quality room or food images make your property less appealing than it truly is.",
      image: "https://i.ibb.co/PsSz6F5P/poor-photo.png",
    },
    {
      title: "Lack of Social Proof",
      description:
        "Guests trust other guests. Without reviews or testimonials, trust drops significantly.",
      image: "https://i.ibb.co/qVmHG63/no-reviews.png",
    },
    {
      title: "No Analytics or Tracking",
      description:
        "Without tracking, you can’t identify what’s working or where guests drop off.",
      image: "https://i.ibb.co/M5h14Skw/no-analytics.png",
    },
  ];

  return (
    <section className={styles.problemSection}>
      <h2 className={styles.sectionTitle}>
        Which Factors Are Intercepting On Booking
      </h2>
      <div className={styles.problemsGrid}>
        {hotelProblems.map((problem, index) => (
          <div
            key={index}
            className={styles.problemCard}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Image
              width={300}
              height={200}
              src={problem.image}
              alt={problem.title}
              className={styles.problemImage}
            />
            <h3 className={styles.problemTitle}>{problem.title}</h3>
            <p className={styles.problemDescription}>{problem.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProblemHotel;
