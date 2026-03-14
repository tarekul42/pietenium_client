import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import styles from "../team.module.css";
import { useState } from "react";
import { api } from "@/data/api";
import { useDashAuth } from "../../DashCotext/DashContext";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import ToastP from "@/components/popupToast/ToastP";
import { useToast, useLoading } from "@/customHooks";

const ShowMembers = ({ data, onDelete }) => {
  const { _id, memberName, email, role, phone, memberProfile } = data;
  const { accessToken } = useDashAuth();
  const [isDeleteBtn, setIsdeleteBtn] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { popInfo, showToast } = useToast();
  const { loading: deleteLoad, startLoading, stopLoading } = useLoading(false);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleDeleteOpen = (id) => {
    if (id === _id) {
      setDeleteOpen(true);
      setUserId(id);
    }
  };

  const handleTeamMemberDelete = async (mId) => {
    if (mId === userId) {
      startLoading();
      try {
        const response = await fetch(`${api}/team/deleteMember/${mId}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        });
        const data = await response.json();

        showToast(data?.message, data?.success);
        if (data?.success) {
          setTimeout(() => {
            setDeleteOpen(false);
            onDelete(mId);
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      } finally {
        stopLoading();
      }
    }
  };

  return (
    <>
      <article
        className={styles.memberData}
        onMouseOver={() => setIsdeleteBtn(true)}
        onMouseLeave={() => setIsdeleteBtn(false)}
      >
        <Image
          src={memberProfile?.photo}
          width={150}
          height={150}
          alt={`${memberName}'s Profile`}
        />
        <h3>{memberName}</h3>
        <h4>{role}</h4>
        <p>{email}</p>
        <p>{phone}</p>
        {isDeleteBtn && (
          <button
            className={styles.deleteBtn}
            onClick={() => handleDeleteOpen(_id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />{" "}
          </button>
        )}
      </article>

      {deleteOpen && (
        <div className={styles.deletePop}>
          <div className={styles.deleteCont}>
            <p>
              Are you sure want to delete this member ? Please Enter Password
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleTeamMemberDelete(userId);
              }}
            >
              <input
                type="password"
                name="passeord"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {deleteLoad ? (
                <SmallLoad />
              ) : (
                <div>
                  <button
                    type="button"
                    id={styles.cencle}
                    onClick={() => setDeleteOpen(false)}
                  >
                    Cencle
                  </button>{" "}
                  <button type="submit" id={styles.delete}>
                    Delete
                  </button>
                </div>
              )}
            </form>
          </div>
          <ToastP popInfo={popInfo} />
        </div>
      )}
    </>
  );
};

export default ShowMembers;
