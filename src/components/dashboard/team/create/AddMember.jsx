"use client";

import { faCameraAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../team.module.css";
import { useState, useEffect } from "react";
import { api } from "@/data/api";
import { useDashAuth } from "../../DashCotext/DashContext";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import ToastP from "@/components/popupToast/ToastP";
import Image from "next/image";
import { useForm, useToast, useLoading } from "@/customHooks";

const Add_A_Member = ({ setOpen, setData }) => {
  const { accessToken } = useDashAuth();
  const { loading, startLoading, stopLoading } = useLoading();
  const { popInfo, showToast } = useToast();
  const {
    formData: teamFormData,
    handleChange,
    resetForm,
  } = useForm({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const { name, email, phone, role } = teamFormData;

  const [memberProfile, setMemberProfile] = useState([]);
  const [memberProfileImg, setMemberProfileImg] = useState("");

  const handlememberProfileInp = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMemberProfile(file);
    setMemberProfileImg(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (memberProfileImg) URL.revokeObjectURL(memberProfileImg);
    };
  }, [memberProfileImg]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    const memberFormData = new FormData();
    memberFormData.append("name", name);
    memberFormData.append("email", email);
    memberFormData.append("phone", phone);
    memberFormData.append("role", role);
    memberFormData.append("teamMember", memberProfile);

    startLoading();
    try {
      const res = await fetch(`${api}/team/addMember`, {
        method: "POST",
        headers: { authorization: `Bearer ${accessToken}` },
        body: memberFormData,
      });
      const data = await res.json();
      showToast(data?.message, data?.success);

      setData(data?.member);
      if (data?.success) {
        setTimeout(() => {
          setOpen(false);
          setMemberProfile([]);
          setMemberProfileImg("");
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
    <div className={styles.createMem} onClick={() => setOpen(false)}>
      <div className={styles.closeBtn}>
        <button onClick={() => setOpen(false)}>❌Close</button>
      </div>

      <div className={styles.createForm} onClick={(e) => e.stopPropagation()}>
        <div className={styles.scrollWrap}>
          <form onSubmit={handleAddMember}>
            <label className={styles.profileLevel}>
              <span>
                <FontAwesomeIcon icon={faCameraAlt} />
              </span>
              {memberProfileImg && (
                <Image
                  src={memberProfileImg}
                  width={200}
                  height={150}
                  alt="team memberProfilenail"
                />
              )}
              <input
                type="file"
                name="memberProfilenail"
                accept="image/*"
                className={styles.memberProfilenailInput}
                onChange={handlememberProfileInp}
              />
            </label>
            <label id={styles.mName}>
              <span>
                Name<sup>*</sup>—
              </span>
              <input
                type="text"
                placeholder="Member Name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </label>
            <label id={styles.mEmail}>
              <span>
                Email<sup>*</sup>—
              </span>
              <input
                type="email"
                placeholder="Member Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </label>
            <label id={styles.mPhone}>
              <span>
                Phone<sup>*</sup>—
              </span>
              <input
                type="text"
                placeholder="Member Phone"
                name="phone"
                value={phone}
                onChange={handleChange}
              />
            </label>
            <label id={styles.mMole}>
              <span>
                Role<sup>*</sup>—
              </span>
              <input
                type="tetx"
                placeholder="Member Role"
                name="role"
                value={role}
                onChange={handleChange}
              />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? <SmallLoad /> : "Add Member"}
            </button>
          </form>
        </div>
      </div>
      <ToastP popInfo={popInfo} />
    </div>
  );
};

export default Add_A_Member;
