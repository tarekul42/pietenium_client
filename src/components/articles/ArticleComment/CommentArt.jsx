import ToastP from "@/components/popupToast/ToastP";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import { useForm, useLoading, useToast } from "@/customHooks";
import { api } from "@/data/api";
import { useEffect, useState } from "react";
import styles from "./comment.module.css";

const CommentArt = ({ articleId }) => {
  const { popInfo, showToast } = useToast();
  const [newComment, setNewComment] = useState({});
  const [comments, setComments] = useState([]);
  const { formData, handleChange, resetForm } = useForm({
    name: "",
    email: "",
    comment: "",
  });
  const { loading, startLoading, stopLoading } = useLoading();
  const { name, email, comment } = formData;

  const handlePickComment = async (artId) => {
    startLoading();
    try {
      const response = await fetch(`${api}/article/comments/add/${artId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          comment,
        }),
      });

      const data = await response.json();
      showToast(data?.message, data?.success);
      if (data?.success) {
        setTimeout(() => {
          setNewComment(data?.comment);
          resetForm();
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      stopLoading();
    }
  };

  const [cLoading, setCLoading] = useState(false);

  const fetchComments = async (artId) => {
    setCLoading(true);
    try {
      const response = await fetch(`${api}/article/comment/get/${artId}`, {
        cache: "no-store",
      });
      const data = await response.json();
      setComments(data?.comments || []);
    } catch (error) {
      console.error(error);
    } finally {
      setCLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(articleId);
  }, [articleId]);

  useEffect(() => {
    if (newComment && newComment?._id) {
      setComments((prev) => {
        const exists = prev?.some((p) => p._id === newComment._id);
        return exists ? prev : [newComment, ...prev];
      });
    }
  }, [newComment]);

  return (
    <div className={styles.commentArt}>
      <h2 className={styles.commentTitle}>
        Comments ({comments?.length || 0})
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePickComment(articleId);
        }}
      >
        <div className={styles.nameEmail}>
          <label>
            <span>
              Name<sup>*</sup>
            </span>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={name}
              required
              onChange={handleChange}
            />
          </label>
          <label>
            <span>
              Email<sup>*</sup>
            </span>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={handleChange}
            />
          </label>
        </div>
        <label>
          <span>
            Comment<sup>*</sup>
          </span>
          <textarea
            name="comment"
            placeholder="Share your thoughts about this article..."
            required
            value={comment}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? <SmallLoad /> : "Post Comment"}
        </button>
      </form>

      <hr className={styles.separator} />

      <div className={styles.commentCont}>
        {comments?.length > 0 ? (
          <>
            <p className={styles.commentCount}>
              {comments.length} Comment{comments.length !== 1 ? "s" : ""}
            </p>
            {comments?.map((c) => (
              <article key={c?._id}>
                <div className={styles.cProfile}>
                  <h2>{c?.commenterMail?.slice(0, 2).toLocaleUpperCase()}</h2>
                </div>
                <div className={styles.commentBody}>
                  <h3>{c?.commenterName}</h3>
                  <pre>{c?.comment}</pre>
                </div>
              </article>
            ))}
          </>
        ) : (
          <div className={styles.noComments}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>

      <ToastP popInfo={popInfo} />
    </div>
  );
};

export default CommentArt;
