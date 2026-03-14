import Skeleton from "./Skeleton";

const HomeCardSkeleton = () => {
    return (
        <div style={{
            width: "var(--card-width)",
            minHeight: "var(--card-min-height)",
            background: "var(--color-surface)",
            border: "1px solid var(--color-surface-elevated)",
            borderRadius: "var(--card-border-radius)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
        }}>
            <Skeleton
                style={{
                    width: "100%",
                    height: "var(--card-image-height, 11rem)",
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                }}
            />
            <div style={{ padding: "1rem", flex: 1, width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Skeleton style={{ height: "1rem", width: "40%", borderRadius: "1rem" }} />
                <Skeleton style={{ height: "1.2rem", width: "90%", marginTop: "0.5rem" }} />
            </div>
        </div>
    );
};

export default HomeCardSkeleton;
