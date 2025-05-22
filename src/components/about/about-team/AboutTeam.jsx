"use client";
import { useEffect, useState } from "react";
import styles from "./aboutTeam.module.css";
import { api } from "@/data/api";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import Image from "next/image";
import Link from "next/link";

const AboutTeam = () => {
  const [Members, setMembers] = useState([]);
  const [loading, setLoading] = useState([]);

  const fetchTeamMemberslData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}/team/getMembers`, {
        cache: "no-store",
      });
      const data = await response.json();
      setMembers(data?.members);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMemberslData();
  }, []);
  return (
    <aside className={styles.aboutTeam}>
      <section className={styles.teamHero}>
        <div className={styles.teamheroCont}>
          <h1>Meet the Minds Behind the Mission</h1>
          <h3>We design. We develop. We deliver. We Help.</h3>
        </div>
      </section>
      <section>
        {loading ? (
          <SmallLoad />
        ) : (
          <div className={styles.members}>
            {Members?.map((data) => {
              const { memberName, role, memberProfile } = data;
              return (
                <article className={styles.memberData}>
                  <Image
                    src={memberProfile?.photo}
                    width={150}
                    height={150}
                    alt={`${memberName}'s Profile`}
                  />
                  <h3>{memberName}</h3>
                  <h4>{role} at PieTech</h4>
                </article>
              );
            })}
          </div>
        )}
      </section>
      <section className={styles.ctaBox}>
        <h2>Want to Work With Our Special Team?</h2>
        <p>
          Let's bring your vision to life. Contact us today and get started!
        </p>
        <Link href="/contact-us">
          <button className={styles.ctaBtn}> Let's Start </button>
        </Link>
      </section>
    </aside>
  );
};

export default AboutTeam;
