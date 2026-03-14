import comp1 from "@/gallary/comapany/comp1.svg";
import comp10 from "@/gallary/comapany/comp10.svg";
import comp11 from "@/gallary/comapany/comp11.svg";
import comp12 from "@/gallary/comapany/comp12.svg";
import comp13 from "@/gallary/comapany/comp13.svg";
import comp2 from "@/gallary/comapany/comp2.svg";
import comp3 from "@/gallary/comapany/comp3.svg";
import comp4 from "@/gallary/comapany/comp4.svg";
import comp5 from "@/gallary/comapany/comp5.svg";
import comp6 from "@/gallary/comapany/comp6.svg";
import comp7 from "@/gallary/comapany/comp7.svg";
import comp8 from "@/gallary/comapany/comp8.svg";
import comp9 from "@/gallary/comapany/comp9.svg";
import Image from "next/image";
import styles from "../home.module.css";
const TrustedComp = () => {
  const logos = [
    comp1,
    comp2,
    comp3,
    comp4,
    comp5,
    comp6,
    comp7,
    comp8,
    comp9,
    comp10,
    comp11,
    comp12,
    comp13,
  ];
  return (
    <div className={styles.sliderWrapper}>
      <p>Trusted by Leading Organizations</p>
      <div className={styles.slideCont}>
        <div className={styles.sliderTrack}>
          {[...Array(logos.length - 1)].flatMap((_, i) =>
            logos.map((logo, idx) => (
              <div className={styles.logoBox} key={`${i}-${idx}`}>
                <Image src={logo} alt="company-logo" width={150} height={70} />
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default TrustedComp;
