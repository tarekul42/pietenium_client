import ToastP from "@/components/popupToast/ToastP";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import { useLoading, useToast } from "@/customHooks";
import { api } from "@/data/api";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { useDashAuth } from "../../DashCotext/DashContext";
import styles from "../article.module.css";
import UpdateArticle from "../update/updateArt";

const ArticleDShow = ({ data, onUpdate, onDelete }) => {
  const { _id, title, thumbnail } = data;
  const { accessToken } = useDashAuth();
  const [updateOpen, setupdateOpen] = useState(false);
  const { popInfo, showToast } = useToast();
  const { loading: deleteLoad, startLoading, stopLoading } = useLoading(false);

  const handleDeleteArticle = async (id) => {
    if (id === _id) {
      startLoading();
      try {
        const res = await fetch(`${api}/article/delete/${id}`, {
          method: "DELETE",
          headers: { authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        showToast(data?.message, data?.success);

        if (data?.success) {
          setTimeout(() => {
            onDelete(id);
          }, 2000);
        }
      } catch (err) {
        console.error("Delete failed", err);
      } finally {
        stopLoading();
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
