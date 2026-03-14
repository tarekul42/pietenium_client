import styles from "./skeleton.module.css";

const Skeleton = ({ className, ...props }) => {
  return <div className={`${styles.skeleton} ${className || ""}`} {...props} />;
};

export default Skeleton;
