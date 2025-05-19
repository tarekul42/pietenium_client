import Image from "next/image";
import styles from "../article.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import UpdateArticle from "../update/updateArt";

const ArticleDShow = ({ data, onUpdate, onDelete }) => {
  const { _id, title, thumbnail } = data;
  const [updateOpen, setupdateOpen] = useState(false);

  const handleUpdateOpen = (id) => {
    if (id === _id) {
      setupdateOpen(true);
    }
  };

   const handleDeleteArticle = (id) => {
    if (id === _id) {
      setupdateOpen(true);
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
          <button>
            <FontAwesomeIcon icon={faTrashAlt} />
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
    </>
  );
};

export default ArticleDShow;
