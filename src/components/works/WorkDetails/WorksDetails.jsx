"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/data/api";
import { slugify } from "@/utility/slugify";
import styles from "./workD.module.css";

const WorkDetails = ({ project }) => {
const { _id: currentId, title, details, gallary, pLink, thumbnail } = project ? project : {};
  const [currentImg, setCurrentImg] = useState(0);
  const [otherProjects, setOtherProjects] = useState([]);

  const getValidImage = (img) => img && typeof img === 'string' && img.trim() !== "" ? img : null;
  
  const galleryImages = gallary?.filter(item => getValidImage(item?.img)) || [];
  const headerImageSrc = getValidImage(galleryImages[currentImg]?.img) || getValidImage(galleryImages[0]?.img) || getValidImage(thumbnail?.photo) || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23333' width='1920' height='1080'/%3E%3Ctext fill='%23666' font-size='48' x='50%25' y='50%25' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
  const currentImage = galleryImages[currentImg];
  const hasValidGallery = galleryImages.length > 0;

  useEffect(() => {
    const fetchOtherProjects = async () => {
      try {
        const res = await fetch(`${api}/project/allProjects`);
        const data = await res.json();
        if (data?.data) {
          // Filter out current project and pick 3 random/recent ones
          const filtered = data.data.filter(p => p._id !== currentId).slice(0, 3);
          setOtherProjects(filtered);
        }
      } catch (err) {
        console.error("Error fetching related projects:", err);
      }
    };
    fetchOtherProjects();
    // Scroll to top when project changes
    window.scrollTo(0, 0);
  }, [currentId]);

  return (
    <section className={`${styles.container} animate-fade`}>
      <header className={styles.header}>
        <Image
          src={headerImageSrc}
          alt={title || "Project"}
          fill
          className={styles.headerImage}
          priority
        />
        <div className={styles.overlay} />
        <div className={styles.headerContent}>
          <Link href="/our-works" className={styles.backLink}>
            ← Back to Projects
          </Link>
          <div className={styles.heroText}>
            <span className={styles.projectCategory}>Case Study</span>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>
              Exploring the vision, strategy, and execution behind this successful digital launch.
            </p>
          </div>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.detailsGrid}>
          <div className={styles.mainContent}>
            <section className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>Project Narrative</h2>
              <div className={styles.description}>
                {details?.split("\r\n").map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
              
              {pLink && (
                <a
                  href={pLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Launch Live Site
                </a>
              )}
            </section>

            <section className={styles.gallerySection}>
              <h2 className={styles.sectionTitle}>Visual Showcase</h2>
              {hasValidGallery ? (
              <div className={styles.sliderWrapper}>
                <div className={styles.mainImageContainer}>
                    <Image
                      src={getValidImage(currentImage?.img) || headerImageSrc}
                      alt={`${title} - Image ${currentImg + 1}`}
                      fill
                      className={styles.mainImage}
                      priority
                    />
                </div>

                <div className={styles.sliderControls}>
                  <button
                    className={styles.sliderBtn}
                    onClick={() =>
                      setCurrentImg((prev) =>
                        prev === 0 ? (galleryImages.length || 1) - 1 : prev - 1
                      )
                    }
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <span className={styles.sliderCounter}>
                    {currentImg + 1} / {galleryImages.length}
                  </span>
                  <button
                    className={styles.sliderBtn}
                    onClick={() =>
                      setCurrentImg((prev) =>
                        prev === (galleryImages.length || 1) - 1 ? 0 : prev + 1
                      )
                    }
                    aria-label="Next image"
                  >
                    →
                  </button>
                </div>

                <div className={styles.thumbnailGrid}>
                  {galleryImages.map((item, idx) => (
                    <div
                      className={`${styles.thumbnail} ${
                        idx === currentImg ? styles.active : ""
                      }`}
                      onClick={() => setCurrentImg(idx)}
                      key={item?.photoId || idx}
                    >
                      <Image
                        src={item.img}
                        alt={`Thumbnail ${idx + 1}`}
                        width={80}
                        height={60}
                      />
                    </div>
                  ))}
                </div>
              </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px', color: '#666' }}>No images available</div>
              )}
            </section>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.ctaCard}>
              <h3>Elevate Your Vision</h3>
              <p>Ready to build something equally impactful? Let&apos;s talk strategy.</p>
              <Link href="/contact-us" className={styles.ctaBtn}>
                Get Started
              </Link>
            </div>
            
            {otherProjects.length > 0 && (
              <div className={styles.relatedWorks}>
                <h4>Related Projects</h4>
                <div className={styles.relatedGrid}>
                  {otherProjects.map((p) => (
                    <Link 
                      key={p._id} 
                      href={`/work/${slugify(p.title)}/${p._id}`}
                      className={styles.relatedItem}
                    >
                      <div className={styles.relatedImg}>
                        <Image 
                          src={p.thumbnail?.photo} 
                          alt={p.title} 
                          width={100} 
                          height={70} 
                        />
                      </div>
                      <div className={styles.relatedInfo}>
                        <h5>{p.title}</h5>
                        <span>View Project</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </section>
  );
};

export default WorkDetails;
