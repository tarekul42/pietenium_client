import { useEffect, useRef, useState } from "react";
import styles from "./faqHtl.module.css";

const FAQ_Hotel = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  const faqs = [
    {
      question: "How can digital marketing improve my hotel's occupancy rate?",
      answer:
        "Digital marketing can significantly boost your hotel's occupancy by increasing online visibility, targeting specific traveler segments, and optimizing booking conversion rates. Through strategic SEO, targeted social media campaigns, and email marketing, you can reach potential guests at every stage of their booking journey. Our clients typically see a 30-50% increase in direct bookings within 6 months of implementing a comprehensive digital strategy.",
    },
    {
      question:
        "What's the most effective way to generate leads for my restaurant?",
      answer:
        "The most effective lead generation for restaurants combines a strong online presence with targeted promotions. This includes optimizing your Google Business Profile, running local SEO campaigns, leveraging social media platforms like Instagram for visual appeal, and implementing an email marketing strategy. Additionally, offering online reservations and special promotions through your website can capture potential customers directly. Our restaurant clients typically experience a 40-60% increase in qualified leads within 3 months.",
    },
    {
      question: "How important is mobile optimization for hotel websites?",
      answer:
        "Mobile optimization is absolutely critical for hotel websites, as over 60% of travelers now book on mobile devices. A mobile-friendly site ensures fast loading times, easy navigation, and a seamless booking experience on smaller screens. Google also prioritizes mobile-friendly sites in search rankings. Hotels with optimized mobile experiences see up to 70% higher conversion rates and lower bounce rates compared to non-optimized sites.",
    },
    {
      question: "What SEO strategies work best for restaurants?",
      answer:
        "Effective restaurant SEO strategies include optimizing for local search terms, creating location-specific content, building quality backlinks from food blogs and local directories, and maintaining an active Google Business Profile with regular updates and photos. Menu optimization with descriptive dish names and ingredients can also capture long-tail search traffic. Restaurants implementing these strategies typically see 50-80% more organic traffic within 4-6 months.",
    },
    {
      question: "How can I improve my hotel's online reputation?",
      answer:
        "Improving your hotel's online reputation requires a proactive approach to review management across platforms like TripAdvisor, Google, and Booking.com. This includes promptly responding to all reviews (both positive and negative), encouraging satisfied guests to leave reviews, and addressing any recurring issues mentioned in feedback. Implementing a structured reputation management strategy typically leads to a 0.5-1 star rating improvement within 6 months and significantly increases booking conversion rates.",
    },
    {
      question: "What's the ROI of email marketing for restaurants?",
      answer:
        "Email marketing offers one of the highest ROIs for restaurants, typically generating $38-42 for every $1 spent. Effective restaurant email campaigns include personalized promotions, loyalty program updates, and exclusive event invitations. Segmented email lists based on customer preferences and behaviors can increase open rates by 30% and conversion rates by 50% compared to generic blasts. Regular communication keeps your restaurant top-of-mind and encourages repeat visits.",
    },
    {
      question: "How can social media marketing benefit my hotel?",
      answer:
        "Social media marketing can significantly benefit your hotel by building brand awareness, engaging with potential guests, and showcasing your property's unique features. Visual platforms like Instagram and Facebook are ideal for highlighting amenities, sharing guest experiences, and promoting special offers. Hotels with active social media presences typically see 25-40% more direct bookings and higher engagement rates, especially when leveraging user-generated content and influencer partnerships.",
    },
    {
      question:
        "What's the best way to optimize my restaurant's online ordering system?",
      answer:
        "Optimizing your restaurant's online ordering system involves creating a user-friendly interface with high-quality food photography, detailed descriptions, and transparent pricing. Implementing features like saved customer profiles, order customization options, and real-time inventory updates can significantly improve the user experience. Restaurants with optimized online ordering systems typically see 35-50% higher average order values and 60% more repeat orders compared to those with basic systems.",
    },
    {
      question: "How can content marketing help my hospitality business?",
      answer:
        "Content marketing helps hospitality businesses by establishing authority, improving SEO rankings, and engaging potential customers. For hotels and restaurants, this includes creating blog posts about local attractions, sharing behind-the-scenes content, developing travel guides, and showcasing customer stories. Effective content marketing strategies typically result in 40-60% more organic traffic and 25-35% higher conversion rates by building trust and providing value to potential guests before they even book.",
    },
    {
      question:
        "What metrics should I track to measure my hotel's digital marketing success?",
      answer:
        "Key metrics to track for hotel digital marketing success include website traffic sources, bounce rate, conversion rate, average booking value, cost per acquisition, and return on ad spend. Additionally, tracking direct vs. OTA bookings, average length of stay, and customer lifetime value provides insight into overall business health. Successful hotels typically see a 20-30% improvement in these metrics within 6 months of implementing data-driven marketing strategies.",
    },
    {
      question: "How can I improve my restaurant's local search visibility?",
      answer:
        "Improving your restaurant's local search visibility involves claiming and optimizing your Google Business Profile, ensuring consistent NAP (Name, Address, Phone) information across all directories, generating positive reviews, and creating location-specific content. Additionally, implementing local schema markup on your website and building backlinks from local businesses and publications can significantly boost your rankings. Restaurants following these practices typically see 50-70% more impressions in local search results within 3-4 months.",
    },
    {
      question:
        "What's the most cost-effective marketing strategy for small hotels?",
      answer:
        "The most cost-effective marketing strategy for small hotels focuses on building direct relationships with guests through email marketing, social media engagement, and a user-friendly website with a booking engine. Leveraging user-generated content, encouraging reviews, and implementing a referral program can also generate significant returns with minimal investment. Small hotels implementing these strategies typically see a 3-5x return on their marketing spend and reduce reliance on costly OTAs by 20-30% within a year.",
    },
  ];

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

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.faq} ${sectionVisible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        <p className={styles.subtitle}>
          Expert answers to your hotel and restaurant marketing questions
        </p>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${
                activeIndex === index ? styles.active : ""
              }`}
            >
              <button
                className={styles.question}
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{faq.question}</span>
                <span className={styles.arrow}>→</span>
              </button>

              <div className={styles.answer}>
                <div className={styles.answerContent}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ_Hotel;
