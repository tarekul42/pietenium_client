"use client";
import Image from "next/image";
import styles from "./contact.module.css";
import mailBox from '@/gallary/siteImgs/mailBox.svg'

const Contact = () => {
  return (
    <aside className={styles.contact}>
      <section className={styles.contactHead}>
        <div className={cntcHeadSect}>
          <h1>💼 Start Your Digital Journey</h1>
          <p> Tell us about your goals. We'll craft a solution that brings your ideas to life, the smart way.</p>
        </div>
      </section>
      <section className={contactBody}>
        <div className={cntcBdyImg}>
          <Image />
        </div>
      </section>
    </aside>
  );
};

export default Contact;
