import Image from "next/image";
import Link from "next/link";
import notFoundImg from "@/gallary/siteImgs/404NotFound.svg";
export default function CustomNotFound() {
  return (
    <section
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#032b4d93",
        padding: "2rem 0",
      }}
    >
      <Image
        src={notFoundImg}
        width={400}
        height={300}
        alt="notfoundImage"
        style={{ width: "50%", height: "auto", objectFit: "cover" }}
      />
      <Link href={"/"}>
        <button style={{ cursor: "pointer", borderRadius: "2rem" }}>
          back to home
        </button>
      </Link>
    </section>
  );
}
