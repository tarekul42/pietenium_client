import Image from "next/image";
import styles from "../article.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import UpdateArticle from "../update/updateArt";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import { api } from "@/data/api";
import { useDashAuth } from "../../DashCotext/DashContext";
import ToastP from "@/components/popupToast/ToastP";

const ArticleDShow = ({ data, onUpdate, onDelete }) => {
  const { _id, title, thumbnail } = data;
  const { accessToken } = useDashAuth();
  const [updateOpen, setupdateOpen] = useState(false);

  const [popInfo, setPopInfo] = useState({
    trigger: null,
    type: null,
    message: null,
  });

  const handleUpdateOpen = (id) => {
    if (id === _id) {
      setupdateOpen(true);
    }
  };

  const [deleteLoad, setDeleteLoad] = useState("");

  const handleDeleteArticle = async (id) => {
    if (id === _id) {
      setDeleteLoad(id);
      try {
        const res = await fetch(`${api}/article/delete/${id}`, {
          method: "DELETE",
          headers: { authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        setPopInfo({
          trigger: Date.now(),
          type: data?.success,
          message: data?.message,
        });

        if (data?.success) {
          setTimeout(() => {
            onDelete(id);
          }, 2000);
        }
      } catch (err) {
        console.error("Delete failed", err);
      } finally {
        setDeleteLoad("");
      }
    }
  };

  return (
    <>
      <article className={styles.showArt}>
        <div>
          <Image
            src={thumbnail?.photo}
            width={80}
            height={40}
            alt={`${title} photo`}
          />
          <h4>{title?.slice(0, 40)}</h4>
        </div>

        <div>
          <button
            onClick={() => {
              handleUpdateOpen(_id);
            }}
          >
            <FontAwesomeIcon icon={faPencilSquare} />
            Edit
          </button>
          <button
            onClick={() => handleDeleteArticle(data?._id)}
            disabled={deleteLoad}
            className={styles.deleteBtn}
          >
            {deleteLoad ? <SmallLoad /> : <FontAwesomeIcon icon={faTrashAlt} />}
          </button>
        </div>
      </article>
      {updateOpen && (
        <UpdateArticle
          setOpen={setupdateOpen}
          onUpdate={onUpdate}
          artData={data}
        />
      )}
      <ToastP popInfo={popInfo} />
    </>
  );
};

export default ArticleDShow;
