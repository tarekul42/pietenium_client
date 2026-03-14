import Skeleton from "./Skeleton";

const ArticleCardSkeleton = () => {
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-surface-elevated)",
        borderRadius: "16px",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 16:9 Image Placeholder */}
      <div
        style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}
      >
        <Skeleton
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: 0,
          }}
        />
        {/* Badge Placeholder */}
        <Skeleton
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            width: "4rem",
            height: "1.25rem",
            borderRadius: "30px",
            zIndex: 2,
          }}
        />
      </div>

      {/* Content Placeholder */}
      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          flexGrow: 1,
        }}
      >
        {/* Title Skeletons */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Skeleton
            style={{ height: "1.5rem", width: "90%", borderRadius: "4px" }}
          />
          <Skeleton
            style={{ height: "1.5rem", width: "70%", borderRadius: "4px" }}
          />
        </div>

        {/* Hashtag Skeletons */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Skeleton
            style={{ height: "1rem", width: "3.5rem", borderRadius: "4px" }}
          />
          <Skeleton
            style={{ height: "1rem", width: "4rem", borderRadius: "4px" }}
          />
          <Skeleton
            style={{ height: "1rem", width: "2.5rem", borderRadius: "4px" }}
          />
        </div>

        {/* Read More Placeholder */}
        <div style={{ marginTop: "auto" }}>
          <Skeleton
            style={{ height: "1rem", width: "6rem", borderRadius: "4px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
