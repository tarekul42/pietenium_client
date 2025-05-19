"use client";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../article.module.css";
import { useState, useEffect } from "react";
import { api } from "@/data/api";
import { useDashAuth } from "../../DashCotext/DashContext";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import ToastP from "@/components/popupToast/ToastP";
import Image from "next/image";
import TextEditor from "@/components/textEditor/TextEditor";
// import RichTextEditor from "@/components/textEditor/RichTextEditor";

const CreateArticle = ({ setOpen, setData }) => {
  const { accessToken } = useDashAuth();
  const [loading, setLoading] = useState(false);
  const [popInfo, setPopInfo] = useState({
    trigger: null,
    type: null,
    message: null,
  });
  const [articleData, setArticleData] = useState({
    title: "",
    hashtags: "",
    articleType: "",
    content: "",
  });
  const { title, content, hashtags, articleType } = articleData;

  const colletArticleData = (e) => {
    setArticleData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [thumb, setThumb] = useState([]);
  const [thumbImg, setThumbImg] = useState("");

  const handleThumbInp = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumb(file);
    setThumbImg(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (thumbImg) URL.revokeObjectURL(thumbImg);
    };
  }, [thumbImg]);

  const handleUploadProj = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("thumbnail", thumb);
    formData.append("hashtags", hashtags);
    formData.append("articleType", articleType);
    // console.log(articleData);

    setLoading(true);
    try {
      const res = await fetch(`${api}/article/post`, {
        method: "POST",
        headers: { authorization: `Bearer ${accessToken}` },
        body: formData,
      });
      const data = await res.json();
      setPopInfo({
        trigger: Date.now(),
        type: data?.success,
        message: data?.message,
      });

      setData(data?.article);
      if (data?.success) {
        setTimeout(() => {
          setOpen(false);
          setThumb([]);
          setThumbImg("");
          setArticleData({
            title: "",
            hashtags: "",
            articleType: "",
            content: "",
          });
        }, 2000);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createArt} onClick={() => setOpen(false)}>
      <div className={styles.closeBtn}>
        <button onClick={() => setOpen(false)}>❌Close</button>
      </div>

      <div className={styles.createForm} onClick={(e) => e.stopPropagation()}>
        <div className={styles.scrollWrap}>
          <form onSubmit={handleUploadProj}>
            <label id={styles.pTitle}>
              <textarea
                placeholder="Article Title"
                name="title"
                value={title}
                onChange={(e) => {
                  const wordArray = e.target.value.trim().split(/\s+/);
                  if (wordArray.length <= 20) {
                    setArticleData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }
                }}
              ></textarea>
              <span>{title.trim().split(/\s+/).filter(Boolean).length}/20</span>
            </label>

            <div className={styles.tagAndType}>
              <label id={styles.tags}>
                <textarea
                  placeholder="Add Hashtags (Note: Hashtags Count By Per word)"
                  name="hashtags"
                  value={hashtags}
                  onChange={(e) => {
                    const wordArray = e.target.value.trim().split(/\s+/);
                    if (wordArray.length <= 10) {
                      setArticleData((prev) => ({
                        ...prev,
                        hashtags: e.target.value,
                      }));
                    }
                  }}
                ></textarea>
                <span>
                  {hashtags.trim().split(/\s+/).filter(Boolean).length}/10
                </span>
              </label>

              <label id={styles.type}>
                <select
                  name="articleType"
                  onChange={colletArticleData}
                  value={articleType}
                >
                  <option value="">--Select Article Type --</option>
                  <option value="news">News</option>
                  <option value="article">Article</option>
                </select>
              </label>
            </div>

            <label className={styles.thumbnailLabel}>
              <span>
                <FontAwesomeIcon icon={faPlus} /> Thumbnail
              </span>
              {thumbImg && (
                <Image
                  src={thumbImg}
                  width={200}
                  height={150}
                  alt="Article Thumbnail"
                />
              )}
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                className={styles.thumbnailInput}
                onChange={handleThumbInp}
              />
            </label>

            <label id={styles.artDesc}>
              <TextEditor
                value={content}
                onChange={(value) =>
                  setArticleData((prev) => ({ ...prev, content: value }))
                }
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? <SmallLoad /> : "Upload"}
            </button>
          </form>

          {/* <div
          className="editorContent"
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              background: "#ffffffd5",
              color:'#0e0e0e',
              marginTop: "1rem",
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          /> */}

        </div>
      </div>
      <ToastP popInfo={popInfo} />
    </div>
  );
};

export default CreateArticle;
