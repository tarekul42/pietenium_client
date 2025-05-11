"use client";
import { useState } from "react";
import styles from "./home.module.css";

const Home = () => {
  // const [data, setData] = useState("");
  // const [loading, setLoading] = useState(false);

  // const handleSetCookie = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch("http://localhost:1618/", {
  //       credentials: "include",
  //     });
  //     const getData = await response.json();
  //     setData(getData);
  //   } catch (error) {
  //     throw new Error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // console.log(data);
  return (
    <section className={styles.home}>
      <h1>Hello</h1>
    </section>
  );
};

export default Home;
