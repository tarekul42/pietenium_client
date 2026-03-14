import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "../project.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useFilePreview } from "@/customHooks/UseFileReader";
import { api } from "@/data/api";
import { useDashAuth } from "../../DashCotext/DashContext";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import ToastP from "@/components/popupToast/ToastP";
import Image from "next/image";

const CreateProject = ({ setOpen, setData }) => {
  const [projData, setProjData] = useState({
    title: "",
    details: "",
    pLink: "",
  });
  const [loading, setLoading] = useState(false);
  const { accessToken } = useDashAuth();

  const [popInfo, setPopInfo] = useState({
    trigger: null,
    type: null,
    message: null,
  });

  const colletProjData = (e) => {
    setProjData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const { title, details, pLink } = projData;
  /*Collect Thumbnail image */
  const [thumb, setThumb] = useState([]);
  const [thumbImg, setThumbImg] = useState("");

  const handleThumbInp = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setThumb(file);
    const thumbUrl = URL.createObjectURL(file);
    setThumbImg(thumbUrl);
  };
  useEffect(() => {
    return () => {
      if (thumbImg) {
        URL.revokeObjectURL(thumbImg);
      }
    };
  }, [thumbImg]);

  /*Collect gallray image */
  const {
    files: gallery,
    setFiles: setGallray,
    addFiles: addGalleryImages,
    removeFile: removeGalleryImage,
  } = useFilePreview();

  /* @Handle Upload Pojects ---> */

  const formData = new FormData();
  formData.append("title", title);
  formData.append("details", details);
  formData.append("pLink", pLink);
  formData.append("thumbnail", thumb);
  gallery.forEach((img) => {
    formData.append("gallary", img.file);
  });

  const handleUploadProj = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${api}/project/add`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      const data = await res.json();
      setPopInfo({
        trigger: Date.now(),
        type: data?.success,
        message: data?.message,
      });
      setData(data?.project);
      if (data?.success) {
        setTimeout(() => {
          setOpen(false);
          setGallray([]);
          setThumb([]);
          setThumbImg("");
          setProjData({ title: "", details: "" });
        }, 2000);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createProj} onClick={() => setOpen(false)}>
      <div className={styles.closeBtn}>
        <button onClick={() => setOpen(false)}>❌Close</button>
      </div>

      <div className={styles.createForm} onClick={(e) => e.stopPropagation()}>
        <div className={styles.scrollWrap}>
          <form onSubmit={handleUploadProj}>
            <label id={styles.pTitle}>
              <textarea
                placeholder="Project Title"
                name="title"
                value={title}
                onChange={colletProjData}
              ></textarea>
            </label>
            <label id={styles.pLink}>
              <input
                type="text"
                placeholder="Project Link"
                name="pLink"
                value={pLink}
                onChange={colletProjData}
              />
            </label>
            <label
              className={styles.thumbnailLabel}
              style={{ backgroundImage: thumbImg && `url(${thumbImg})` }}
            >
              <span>
                <FontAwesomeIcon icon={faPlus} /> Thumbnail
              </span>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                className={styles.thumbnailInput}
                onChange={handleThumbInp}
              />
            </label>
            <div className={styles.pGallary}>
              <label>
                <span>Project Gallay : </span>
                {/* <br /> */}

                <input
                  type="file"
                  name="gallary"
                  accept="image/*"
                  onChange={(e) => addGalleryImages(e.target.files)}
                  multiple
                />
              </label>
              {gallery && (
                <div className={styles.imagePreview}>
                  {gallery?.map((img, idx) => (
                    <div key={img?.id}>
                      <button
                        type="button"
                        className={styles.cutImg}
                        onClick={() => removeGalleryImage(img?.id)}
                      >
                        ❌
                      </button>
                      <Image
                        src={img?.url}
                        alt={`uploaded-${idx}`}
                        width={100}
                        height={100}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <label id={styles.pDesc}>
              <textarea
                name="details"
                placeholder="Project Details"
                value={details}
                onChange={colletProjData}
              ></textarea>
            </label>
            <button type="submit" disabled={loading}>
              {loading ? <SmallLoad /> : "Upload"}
            </button>
          </form>
        </div>
      </div>
      <ToastP popInfo={popInfo} />
    </div>
  );
};

export default CreateProject;
