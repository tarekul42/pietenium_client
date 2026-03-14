"use client";
import { useEffect, useState, useCallback } from "react";
import styles from "./aboutTeam.module.css";
import { api } from "@/data/api";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import Image from "next/image";
import Link from "next/link";
import { useLoading } from "@/customHooks";

const AboutTeam = () => {
  const [Members, setMembers] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();

  const fetchTeamMemberslData = useCallback(async () => {
    startLoading();
    try {
      const response = await fetch(`${api}/team/getMembers`, {
        cache: "no-store",
      });
      const data = await response.json();
      setMembers(data?.members);
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    fetchTeamMemberslData();
  }, [fetchTeamMemberslData]);
  return (
    <aside className={styles.aboutTeam}>
      <section className={styles.teamHero}>
        <div className={styles.teamheroCont}>
          <h1>Meet the Minds Behind the Mission</h1>
          <p>We design. We develop. We deliver. We excel.</p>
        </div>
      </section>
      <section className={styles.teamGridSection}>
        <div className={styles.gridContainer}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <SmallLoad />
            </div>
          ) : (
            <div className={styles.members}>
              {Members?.map((data, index) => {
                const { memberName, role, memberProfile } = data;
                return (
                  <article key={index} className={styles.memberCard}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={memberProfile?.photo}
                        width={200}
                        height={200}
                        alt={`${memberName}'s Profile`}
                        className={styles.profileImg}
                      />
                    </div>
                    <div className={styles.memberInfo}>
                      <h3>{memberName}</h3>
                      <p className={styles.memberRole}>{role}</p>
                      <p className={styles.companyName}>Pietenium</p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2>Want to join our vision?</h2>
          <p>
            We&apos;re always looking for talented minds to help us build the
            future. Let&apos;s create something extraordinary together.
          </p>
          <Link href="/contact-us" className={styles.ctaBtn}>
            Let&apos;s Collaborate
          </Link>
        </div>
      </section>
    </aside>
  );
};

export default AboutTeam;
