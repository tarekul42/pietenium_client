import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "../project.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useFilePreview } from "@/customHooks/UseFileReader";
import { api } from "@/data/api";
import { useDashAuth } from "../../DashCotext/DashContext";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import ToastP from "@/components/popupToast/ToastP";

const UpdateP = ({ setOpen, data, setData, onUpdate }) => {
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

  const { title, details, pLink } = projData;

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

  const [prevGallery, setPrevGallery] = useState([]);

  const {
    files: gallery,
    setFiles: setGallray,
    addFiles: addGalleryImages,
    removeFile: removeGalleryImage,
  } = useFilePreview(0, 30 - prevGallery?.length);

  useEffect(() => {
    if (data) {
      setProjData({
        title: data?.title,
        details: data?.details,
        pLink: data?.pLink,
      });
      setThumbImg(data?.thumbnail?.photo);
      setPrevGallery(data?.gallary);
    }
  }, [data]);
  const colletProjData = (e) => {
    setProjData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [imgCutLoad, setImgCutLoad] = useState("");

  const prevGallaryImgCut = async (pId, imgId) => {
    if (prevGallery?.find((i) => i.photoId === imgId)) {
      setImgCutLoad(imgId);
      try {
        const res = await fetch(`${api}/project/cutImg/${pId}/${imgId}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await res.json();
        if (data?.success) {
          setPrevGallery(data?.gallary);
        }
      } catch (err) {
        console.error("Cutting Failed", err);
      } finally {
        setImgCutLoad("");
      }
    }
  };

  const handleUpdateP = async (pId) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("details", details);
    formData.append("thumbnail", thumb);
    formData.append("pLink", pLink);

    gallery.forEach((img) => {
      formData.append("gallary", img.file);
    });

    try {
      const res = await fetch(`${api}/project/update/${pId}`, {
        method: "PATCH",
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

      if (data?.success) {
        onUpdate && onUpdate(data?.project);

        setTimeout(() => {
          setOpen(false);
          setGallray([]);
          setThumb([]);
          setData({});
        }, 2000);
      }
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  // console.log(data);
  return (
    <>
      <div className={styles.createProj} onClick={() => setOpen(false)}>
        <div className={styles.closeBtn}>
          <button onClick={() => setOpen(false)}>❌Close</button>
        </div>

        <div className={styles.createForm} onClick={(e) => e.stopPropagation()}>
          <div className={styles.scrollWrap}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateP(data?._id);
              }}
            >
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
                  <span>Project Gallery:</span>
                  <input
                    type="file"
                    name="gallary"
                    accept="image/*"
                    onChange={(e) => addGalleryImages(e.target.files)}
                    multiple
                  />
                </label>
                {gallery?.length > 0 && (
                  <div className={styles.imagePreview}>
                    {gallery.map((img, idx) => (
                      <div key={img.id}>
                        <button
                          type="button"
                          className={styles.cutImg}
                          onClick={() => removeGalleryImage(img.id)}
                        >
                          ❌
                        </button>
                        <img src={img.url} alt={`uploaded-${idx}`} />
                      </div>
                    ))}
                  </div>
                )}
                {prevGallery?.length > 0 && (
                  <div className={styles.imagePreview}>
                    {prevGallery?.map((img, idx) => (
                      <div key={img?.photoId}>
                        <button
                          type="button"
                          className={styles.cutImg}
                          onClick={() =>
                            prevGallaryImgCut(data?._id, img?.photoId)
                          }
                        >
                          {imgCutLoad === img?.photoId ? <SmallLoad /> : "❌"}
                        </button>
                        <img src={img?.img} alt={`prevImg-${idx}`} />
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
                {loading ? <SmallLoad /> : "Update Project"}
              </button>
            </form>
          </div>
        </div>
        <ToastP popInfo={popInfo} />
      </div>
    </>
  );
};

export default UpdateP;
