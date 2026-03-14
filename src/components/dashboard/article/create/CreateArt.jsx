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
import { useForm, useToast, useLoading } from "@/customHooks";

const CreateArticle = ({ setOpen, setData }) => {
  const { accessToken } = useDashAuth();
  const { loading, startLoading, stopLoading } = useLoading();
  const { popInfo, showToast } = useToast();
  const { formData, handleChange, setField, resetForm } = useForm({
    title: "",
    hashtags: "",
    articleType: "",
    content: "",
  });
  const { title, content, hashtags, articleType } = formData;

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
    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("content", content);
    formDataToSend.append("thumbnail", thumb);
    formDataToSend.append("hashtags", hashtags);
    formDataToSend.append("articleType", articleType);

    startLoading();
    try {
      const res = await fetch(`${api}/article/post`, {
        method: "POST",
        headers: { authorization: `Bearer ${accessToken}` },
        body: formDataToSend,
      });
      const data = await res.json();
      showToast(data?.message, data?.success);

      setData(data?.article);
      if (data?.success) {
        setTimeout(() => {
          setOpen(false);
          setThumb([]);
          setThumbImg("");
          resetForm();
        }, 2000);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      stopLoading();
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
                    setField("title", e.target.value);
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
                      setField("hashtags", e.target.value);
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
                  onChange={handleChange}
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
                onChange={(value) => setField("content", value)}
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
