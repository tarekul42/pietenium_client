"use client";
import { useEffect, useState } from "react";
import styles from "./team.module.css";
import { api } from "@/data/api";
import Add_A_Member from "./create/AddMember";
import ShowMembers from "./showMmbrs/ShowMembers";

const Team = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [newMember, setNewMember] = useState({});
  const [loading, setLoading] = useState(false);

  const [Members, setMembers] = useState([]);

  const fetchTeamMemberslData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}/team/getMembers`, {
        cache: "no-store",
      });
      const data = await response.json();
      setMembers(data?.members);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMemberslData();
  }, []);
  console.log(newMember);
  useEffect(() => {
    if (newMember && newMember?._id) {
      setMembers((prev) => {
        const exists = prev.some((p) => p._id === newMember._id);
        return exists ? prev : [newMember, ...prev];
      });
    }
  }, [newMember]);

  const handleMemberCut = (memId) => {
    setMembers((prev) => prev.filter((p) => p._id !== memId));
  };
  return (
    <aside className={styles.team}>
      <section className={styles.createTeam}>
        <div className={styles.createTBtn}>
          <button onClick={() => setCreateOpen(true)}>Add A Team Member</button>
        </div>
        {createOpen && (
          <Add_A_Member setOpen={setCreateOpen} setData={setNewMember} />
        )}
      </section>
      <section className={styles.teamShow}>
        <h1>All Members--{">"}</h1>
        <div className={styles.members}>
          {Members?.map((data) => (
            <ShowMembers
              data={data}
              onDelete={handleMemberCut}
              key={data?._id}
            />
          ))}
        </div>
      </section>
    </aside>
  );
};

export default Team;
