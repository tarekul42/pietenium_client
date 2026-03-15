// app/error.js
"use client";

import erroImg from "@/gallery/siteImgs/500error.svg";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("An error occurred:", error);
  }, [error]);

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#032b4d93",
      }}
    >
      <h2>Oops! Something went wrong.</h2>
      <p>{error.message}</p>
      <Image
        src={erroImg}
        width={400}
        height={300}
        alt="errorImage"
        style={{ width: "35%", height: "auto", objectFit: "cover" }}
      />

      <button
        onClick={() => reset()}
        style={{ cursor: "pointer", borderRadius: "2rem" }}
      >
        Try Again
      </button>
    </div>
  );
}
