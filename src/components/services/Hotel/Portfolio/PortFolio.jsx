import { useEffect, useRef, useState } from "react";
import styles from "./prtflHtl.module.css";

const HotelPortfolio = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const caseStudiesRef = useRef([]);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef("down");

  const caseStudies = [
    {
      title: "The Grandview Hotel",
      location: "New York, USA",
      content:
        "The Grandview Hotel was struggling with low occupancy rates and poor online visibility. Our comprehensive digital marketing strategy included website redesign, SEO optimization, and targeted social media campaigns. Within six months, the hotel experienced a 45% increase in direct bookings and a 60% improvement in online review scores. Their revenue per available room (RevPAR) increased by 38%, making them one of the top-performing hotels in their competitive set.",
    },
    {
      title: "La Belle Époque",
      location: "Paris, France",
      content:
        "This charming Parisian bistro was facing stiff competition from newer, trendier establishments. We implemented a content marketing strategy highlighting their rich history and traditional recipes, combined with an influencer partnership program. The restaurant saw a 72% increase in reservations within four months and was featured in three major travel publications. Their Instagram following grew from 2,000 to over 25,000 engaged food enthusiasts.",
    },
    {
      title: "Maple Leaf Resort",
      location: "Ontario, Canada",
      content:
        "Maple Leaf Resort, a seasonal property, was struggling to extend their booking period beyond peak summer months. Our team developed a multi-channel campaign promoting their fall foliage and winter activities packages. The result was a 55% increase in shoulder season bookings and a completely sold-out winter schedule for the first time in the resort's history. Their email marketing campaign achieved a 32% open rate, well above the industry average.",
    },
    {
      title: "The Sterling",
      location: "London, UK",
      content:
        "The Sterling, a luxury boutique hotel, needed to reposition itself in a post-pandemic market. We created a 'Workation' package targeting remote workers and redesigned their website to highlight enhanced safety measures and flexible booking options. This strategy led to an 85% increase in extended stays and a 40% boost in corporate bookings. Their average daily rate (ADR) increased by 28% despite offering flexible cancellation policies.",
    },
    {
      title: "Sunset Beach Resort",
      location: "Miami, USA",
      content:
        "Sunset Beach Resort was facing negative reviews due to outdated facilities and poor customer service perception. Our approach included a reputation management strategy, staff training program, and targeted renovation messaging. Within nine months, the resort's average rating increased from 3.2 to 4.6 stars across major review platforms. Direct bookings increased by 65%, and they achieved their highest-ever revenue during the subsequent peak season.",
    },
    {
      title: "Bistro Provence",
      location: "Lyon, France",
      content:
        "Bistro Provence had excellent food but was virtually unknown outside their immediate neighborhood. We implemented a hyper-local SEO strategy and a community engagement program that included cooking classes and local food festivals. The restaurant saw a 120% increase in foot traffic and a 90% increase in reservations within three months. They were awarded 'Best Neighborhood Restaurant' by a prominent local food critic, leading to features in national culinary magazines.",
    },
    {
      title: "Rocky Mountain Lodge",
      location: "Colorado, USA",
      content:
        "Rocky Mountain Lodge was struggling to attract international visitors despite its stunning location and amenities. Our multilingual digital marketing campaign included targeted ads in key European markets, partnerships with international travel agencies, and content showcasing local experiences. International bookings increased by 150% within a year, and the lodge was featured in three major travel guides. Their overall revenue increased by 75% year-over-year.",
    },
    {
      title: "Thameside Restaurant",
      location: "London, UK",
      content:
        "Thameside Restaurant was experiencing declining lunchtime trade and inconsistent dinner service. We developed a targeted campaign promoting their set lunch menu to local businesses and implemented a reservation management system to optimize table turnover. Lunchtime reservations increased by 95%, and dinner service consistency improved, leading to a 40% increase in average spend per customer. The restaurant was awarded a Michelin Bib Gourmand within 18 months of our campaign launch.",
    },
    {
      title: "Seaside Inn",
      location: "Maine, USA",
      content:
        "Seaside Inn, a family-owned property for three generations, was struggling to compete with newer chain hotels. We created a marketing strategy emphasizing their heritage, personalized service, and local connections. This approach led to a 60% increase in direct bookings and a 45% increase in wedding and event bookings. Their social media engagement increased by 200%, with particular success in user-generated content campaigns encouraging guests to share their experiences.",
    },
    {
      title: "Le Jardin Gourmand",
      location: "Nice, France",
      content:
        "Le Jardin Gourmand had exceptional farm-to-table cuisine but limited brand awareness in a competitive culinary destination. Our strategy focused on visual storytelling through professional food photography, partnerships with food influencers, and a robust content marketing plan highlighting their sustainable practices. Restaurant reservations increased by 80% within six months, and they were featured in a popular culinary television series. Their average check size increased by 25% as guests became more interested in their premium tasting menu.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollDirection.current = currentY > lastScrollY.current ? "down" : "up";
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);

          if (entry.isIntersecting) {
            if (scrollDirection.current === "down") {
              // Show items sequentially when scrolling down
              if (!visibleItems.includes(index)) {
                // Only show if previous items are visible (sequential)
                const shouldShow =
                  index === 0 || visibleItems.includes(index - 1);
                if (shouldShow) {
                  setTimeout(() => {
                    setVisibleItems((prev) => {
                      if (!prev.includes(index)) {
                        return [...prev, index].sort((a, b) => a - b);
                      }
                      return prev;
                    });
                  }, 10);
                }
              }
            }
          } else {
            if (scrollDirection.current === "up") {
              // Hide items from bottom to top when scrolling up
              if (visibleItems.includes(index)) {
                // Only hide if all items after this one are already hidden
                const shouldHide =
                  visibleItems.filter((i) => i > index).length === 0;
                if (shouldHide) {
                  setVisibleItems((prev) => prev.filter((i) => i !== index));
                }
              }
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    const refs = caseStudiesRef.current;
    refs.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      refs.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [visibleItems]);

  return (
    <section className={styles.showcase}>
      <div className={styles.header}>
        <h2 className={styles.title}>Success Stories</h2>
        <div className={styles.titleUnderline}></div>
      </div>
      <div className={styles.container}>
        {caseStudies.map((study, index) => (
          <div
            key={index}
            ref={(el) => (caseStudiesRef.current[index] = el)}
            data-index={index}
            className={`${styles.caseStudy} ${
              visibleItems.includes(index) ? styles.visible : styles.hidden
            }`}
            style={{
              transitionDelay: visibleItems.includes(index)
                ? `${index * 0.1}s`
                : "0s",
            }}
          >
            <div className={styles.decorativeLine}></div>
            <h3 className={styles.studyTitle}>{study.title}</h3>
            <p className={styles.location}>
              <span className={styles.locationIcon}>📍</span>
              {study.location}
            </p>
            <p className={styles.content}>{study.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotelPortfolio;
