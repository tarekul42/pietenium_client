import ToastP from "@/components/popupToast/ToastP";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import { useForm, useLoading, useToast } from "@/customHooks";
import { useFilePreview } from "@/customHooks/UseFileReader";
import { api } from "@/data/api";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDashAuth } from "../../DashCotext/DashContext";
import styles from "../project.module.css";

const CreateProject = ({ setOpen, setData }) => {
  const {
    formData: formState,
    handleChange,
    resetForm,
  } = useForm({
    title: "",
    details: "",
    pLink: "",
  });
  const { loading, startLoading, stopLoading } = useLoading();
  const { accessToken } = useDashAuth();
  const { popInfo, showToast } = useToast();
  const { title, details, pLink } = formState;
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

  const handleUploadProj = async (e) => {
    e.preventDefault();
    startLoading();

    const projectFormData = new FormData();
    projectFormData.append("title", title);
    projectFormData.append("details", details);
    projectFormData.append("pLink", pLink);
    projectFormData.append("thumbnail", thumb);
    gallery.forEach((img) => {
      projectFormData.append("gallery", img.file);
    });

    try {
      const res = await fetch(`${api}/project/add`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: projectFormData,
      });
      const data = await res.json();
      showToast(data?.message, data?.success);
      setData(data?.project);
      if (data?.success) {
        setTimeout(() => {
          setOpen(false);
          setGallray([]);
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
                onChange={handleChange}
              ></textarea>
            </label>
            <label id={styles.pLink}>
              <input
                type="text"
                placeholder="Project Link"
                name="pLink"
                value={pLink}
                onChange={handleChange}
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
                  name="gallery"
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
                onChange={handleChange}
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
