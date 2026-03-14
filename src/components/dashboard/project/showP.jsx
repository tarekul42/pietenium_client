import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import UpdateP from "./update/UpdateP";
import Image from "next/image";
import { api } from "@/data/api";
import { useDashAuth } from "../DashCotext/DashContext";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import ToastP from "@/components/popupToast/ToastP";

const ShowP = ({ data, handleProjectUpdate, handleProjectCut, idx }) => {
  const { _id, title, thumbnail } = data;
  const { accessToken } = useDashAuth();
  const [popInfo, setPopInfo] = useState({
    trigger: null,
    type: null,
    message: null,
  });

  const [updateOpen, setUpdateOpen] = useState(false);
  const [projData, setProjData] = useState({});

  const handleUpdateOpen = async (pId) => {
    if (pId === _id) {
      setUpdateOpen(true);

      try {
        const response = await fetch(`${api}/project/singleProject/${pId}`, {
          cache: "no-store",
        });
        const response2 = await response.json();
        const data = response2?.data;
        setProjData(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [deleteLoad, setDeleteLoad] = useState("");

  const handleDeleteProject = async (pId) => {
    if (pId === _id) {
      setDeleteLoad(pId);
      try {
        const response = await fetch(`${api}/project/delete/${pId}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();

        setPopInfo({
          trigger: Date.now(),
          type: data?.success,
          message: data?.message,
        });

        if (data?.success) {
          setTimeout(() => {
            handleProjectCut(pId);
          }, 2000);
        }
        // const data = response2?.data;
      } catch (error) {
        console.error(error);
      } finally {
        setDeleteLoad("");
      }
    }
  };

  return (
    <>
      <tr key={_id}>
        <td>{idx + 1}</td>
        <td>
          <Image
            src={thumbnail?.photo}
            width={80}
            height={50}
            style={{ objectFit: "cover" }}
            alt={`image-${title}`}
          />
        </td>
        <td>{title?.slice(0, 30)}...</td>
        <td>
          <button onClick={() => handleUpdateOpen(_id)}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
        </td>
        <td>
          <button onClick={() => handleDeleteProject(_id)}>
            {deleteLoad === _id ? (
              <SmallLoad />
            ) : (
              <FontAwesomeIcon icon={faTrashAlt} />
            )}
          </button>
        </td>
      </tr>
      {updateOpen && (
        <UpdateP
          data={projData}
          setData={setProjData}
          setOpen={setUpdateOpen}
          onUpdate={handleProjectUpdate}
        />
      )}
      <ToastP popInfo={popInfo} />
    </>
  );
};

export default ShowP;
