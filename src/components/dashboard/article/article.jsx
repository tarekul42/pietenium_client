"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./article.module.css";
import { api } from "@/data/api";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateArticle from "./create/CreateArt";
import ArticleDShow from "./view/ArticleDShow";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import { useLoading } from "@/customHooks";

const ArticleP = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({});
  const { loading, startLoading, stopLoading } = useLoading();

  const [articles, setArticles] = useState([]);

  const fetchArtclData = useCallback(async () => {
    startLoading();
    try {
      const response = await fetch(`${api}/article/getAll`, {
        cache: "no-store",
      });
      const data = await response.json();
      setArticles(data?.articles);
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    fetchArtclData();
  }, [fetchArtclData]);

  useEffect(() => {
    if (newArticle && newArticle?._id) {
      setArticles((prev) => {
        const exists = prev.some((p) => p._id === newArticle._id);
        return exists ? prev : [newArticle, ...prev];
      });
    }
  }, [newArticle]);

  const handleArticleUpdate = (updatedArt) => {
    setArticles((prev) =>
      prev.map((p) => (p._id === updatedArt._id ? updatedArt : p)),
    );
  };

  const handleArticleCut = (ArtclId) => {
    setArticles((prev) => prev.filter((p) => p._id !== ArtclId));
  };
  return (
    <aside className={styles.article}>
      <section className={styles.create}>
        <div>
          <button onClick={() => setCreateOpen(true)}>
            <FontAwesomeIcon icon={faPlus} /> Create A Article
          </button>
        </div>
        {createOpen && (
          <CreateArticle
            open={createOpen}
            setOpen={setCreateOpen}
            setData={setNewArticle}
          />
        )}
      </section>
      <section className={styles.readArt}>
        <h1>Article Data</h1>
        {loading ? (
          <SmallLoad />
        ) : (
          <>
            {" "}
            {articles?.map((art) => (
              <ArticleDShow
                data={art}
                key={art?._id}
                onUpdate={handleArticleUpdate}
                onDelete={handleArticleCut}
              />
            ))}
          </>
        )}
      </section>
    </aside>
  );
};

export default ArticleP;
