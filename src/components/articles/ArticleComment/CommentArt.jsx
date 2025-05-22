import { useState } from "react";
import styles from "./comment.module.css";
import { api } from "@/data/api";
import ToastP from "@/components/popupToast/ToastP";
import SmallLoad from "@/components/smallLaoding/smallLoad";

const CommentArt = ({ articleId }) => {
  const [popInfo, setPopInfo] = useState({
    trigger: null,
    type: null,
    message: null,
  });

  const [commentData, setCommentData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState({});

  const handleCollectCommentData = (e) => {
    setCommentData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const { name, email, comment } = commentData;

  const hadnlePickComment = async (artId) => {
    setLoading(true);
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
      setPopInfo({
        trigger: Date.now(),
        type: data?.success,
        message: data?.message,
      });
      if (data?.success) {
        setTimeout(() => {
          setNewComment(data?.comment);
          setCommentData({
            name: "",
            email: "",
            comment: "",
          });
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(newComment);

  return (
    <div className={styles.commentArt}>
      <h1>Comments --{">"}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          hadnlePickComment(articleId);
        }}
      >
        <div className={styles.nameEamil}>
          <label>
            <span>
              Name<sup>*</sup>
            </span>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={name}
              required
              onChange={handleCollectCommentData}
            />
          </label>
          <label>
            <span>
              Email<sup>*</sup>
            </span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={handleCollectCommentData}
            />
          </label>
        </div>
        <label id={styles.cLabel}>
          <span>
            Comment<sup>*</sup>
          </span>
          <textarea
            name="comment"
            id="comment"
            placeholder="Pick A Comment"
            required
            value={comment}
            onChange={handleCollectCommentData}
          ></textarea>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? <SmallLoad /> : "Pick Comment"}
        </button>
      </form><hr />
      <ToastP popInfo={popInfo} />
    </div>
  );
};

export default CommentArt;
