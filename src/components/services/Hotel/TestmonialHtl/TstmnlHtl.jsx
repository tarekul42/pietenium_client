import { useState, useEffect, useRef } from "react";
import styles from "./tstmnlHtl.module.css";

const HotelTestimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [autoSlide, setAutoSlide] = useState(true);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  const testimonials = [
    {
      name: "Sarah Johnson",
      jobTitle: "Hotel Manager",
      review:
        "The marketing strategies implemented by this team transformed our online presence. Our direct bookings increased by 45% within just three months, and we've seen a significant improvement in our guest satisfaction scores. Their expertise in the hospitality industry is unmatched.",
      location: "Chicago, USA",
    },
    {
      name: "Michael Chen",
      jobTitle: "Restaurant Owner",
      review:
        "We were struggling to attract new customers despite having excellent food. Their comprehensive approach to digital marketing, including social media campaigns and local SEO, helped us increase reservations by 70% in just four months. The ROI has been exceptional.",
      location: "San Francisco, USA",
    },
    {
      name: "Emma Thompson",
      jobTitle: "Marketing Director",
      review:
        "Our luxury resort was facing stiff competition from newer properties. The team developed a unique branding strategy that highlighted our heritage and exclusivity. We've seen a 60% increase in high-value bookings and our average daily rate has improved by 25%.",
      location: "Aspen, USA",
    },
    {
      name: "David Wilson",
      jobTitle: "Hotel Owner",
      review:
        "After years of declining occupancy, we were at a loss. Their data-driven approach identified key opportunities we had missed. Within six months, our occupancy rates increased from 58% to 82%, and we've maintained this level for over a year now.",
      location: "Miami, USA",
    },
    {
      name: "Sophie Martin",
      jobTitle: "Restaurant Manager",
      review:
        "Our fine dining restaurant needed to attract a younger clientele without alienating our regulars. Their innovative campaign achieved exactly that. We've seen a 40% increase in reservations from guests under 40, while maintaining our loyal customer base.",
      location: "Paris, France",
    },
    {
      name: "James Peterson",
      jobTitle: "Resort General Manager",
      review:
        "The team completely redesigned our digital marketing strategy. Their focus on experiential marketing and user-generated content has transformed our online presence. We've experienced a 55% increase in direct bookings and a 30% reduction in commission costs.",
      location: "Whistler, Canada",
    },
    {
      name: "Olivia Brown",
      jobTitle: "Boutique Hotel Owner",
      review:
        "Our small boutique hotel was struggling to compete with larger chains. Their personalized marketing approach highlighted our unique selling points effectively. We've seen a 65% increase in bookings during off-peak seasons and improved our review scores significantly.",
      location: "London, UK",
    },
    {
      name: "Thomas Dubois",
      jobTitle: "Restaurant Owner",
      review:
        "Our farm-to-table restaurant had great food but poor visibility. Their content strategy and influencer partnerships put us on the map. We've been featured in three major food publications and our reservations have increased by 85% in just five months.",
      location: "Lyon, France",
    },
    {
      name: "Jennifer Lee",
      jobTitle: "Hotel Marketing Manager",
      review:
        "The team's expertise in revenue management and digital marketing has transformed our property's performance. We've achieved a 50% increase in RevPAR and significantly improved our brand positioning in a competitive market. Their strategic insights have been invaluable.",
      location: "Toronto, Canada",
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

  useEffect(() => {
    let slideInterval;

    if (autoSlide && sectionVisible) {
      slideInterval = setInterval(() => {
        setCurrentSlide((prev) =>
          prev === testimonials.length - 1 ? 0 : prev + 1,
        );
      }, 3000);
    }

    return () => {
      if (slideInterval) clearInterval(slideInterval);
    };
  }, [autoSlide, sectionVisible, testimonials.length]);

  const handlePrev = () => {
    setAutoSlide(false);
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setAutoSlide(false);
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const handleIndicatorClick = (index) => {
    setAutoSlide(false);
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setAutoSlide(false);
  };

  const handleMouseLeave = () => {
    setAutoSlide(true);
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.testimonials} ${
        sectionVisible ? styles.visible : ""
      }`}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Client Success Stories</h2>
        <p className={styles.subtitle}>
          Hear from hotel and restaurant owners who transformed their business
        </p>

        <div
          className={styles.carousel}
          ref={carouselRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={styles.slides}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.slide}>
                <div className={styles.testimonialContent}>
                  <p className={styles.review}>
                    &quot;{testimonial.review}&quot;
                  </p>
                  <div className={styles.clientInfo}>
                    <h3 className={styles.clientName}>{testimonial.name}</h3>
                    <p className={styles.clientTitle}>{testimonial.jobTitle}</p>
                    <p className={styles.clientLocation}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className={styles.prevButton}
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            ◀
          </button>
          <button
            className={styles.nextButton}
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            ▶
          </button>
        </div>

        <div className={styles.indicators}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                currentSlide === index ? styles.activeIndicator : ""
              }`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotelTestimonials;
