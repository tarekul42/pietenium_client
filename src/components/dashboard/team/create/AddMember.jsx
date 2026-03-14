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
// import RichTextEditor from "@/components/textEditor/RichTextEditor";

const Add_A_Member = ({ setOpen, setData }) => {
  const { accessToken } = useDashAuth();
  const [loading, setLoading] = useState(false);
  const [popInfo, setPopInfo] = useState({
    trigger: null,
    type: null,
    message: null,
  });
  const [teamData, setTeamData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const { name, email, phone, role } = teamData;

  const colletTeamData = (e) => {
    setTeamData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("role", role);
    formData.append("teamMember", memberProfile);
    // console.log(teamData);

    setLoading(true);
    try {
      const res = await fetch(`${api}/team/addMember`, {
        method: "POST",
        headers: { authorization: `Bearer ${accessToken}` },
        body: formData,
      });
      const data = await res.json();
      setPopInfo({
        trigger: Date.now(),
        type: data?.success,
        message: data?.message,
      });

      setData(data?.member);
      if (data?.success) {
        setTimeout(() => {
          setOpen(false);
          setMemberProfile([]);
          setMemberProfileImg("");
          setTeamData({
            name: "",
            email: "",
            phone: "",
            role: "",
          });
        }, 2000);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
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
                onChange={colletTeamData}
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
                onChange={colletTeamData}
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
                onChange={colletTeamData}
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
                onChange={colletTeamData}
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
