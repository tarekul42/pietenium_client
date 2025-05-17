"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./project.module.css";
import { faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateProject from "./post/createProject";
import { useEffect, useState } from "react";
import { api } from "@/data/api";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import UpdateP from "./update/UpdateP";

const Project = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [newProject, setNewProject] = useState({});
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState([]);

  const fetchProjData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}/project/allProjects`);
      const response2 = await response.json();
      setProjects(response2?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjData();
  }, []);

  useEffect(() => {
    if (newProject && newProject?._id) {
      setProjects((prev) => {
        const exists = prev.some((p) => p._id === newProject._id);
        return exists ? prev : [newProject, ...prev];
      });
    }
  }, [newProject]);

  const [updateOpen, setUpdateOpen] = useState(false);
  const [projId, setProjId] = useState("");

  const handleUpdateOpen = (id) => {
    setProjId(id);
    setUpdateOpen(true);
  };

  const handleProjectUpdate = (updatedProj) => {
    setProjects((prev) =>
      prev.map((p) => (p._id === updatedProj._id ? updatedProj : p))
    );
  };

  return (
    <aside className={styles.project}>
      <section className={styles.create}>
        <div className={styles.createPop}>
          <button onClick={() => setCreateOpen(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add A New Project
          </button>
        </div>
        {createOpen && (
          <CreateProject
            open={createOpen}
            setOpen={setCreateOpen}
            setData={setNewProject}
          />
        )}
      </section>

      <section className={styles.readAndUpdate}>
        <div className={styles.read}>
          <h1>Project Data</h1>

          {loading ? (
            <SmallLoad />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Thumbnail</th>
                  <th>Title</th>
                  <th>
                    <FontAwesomeIcon icon={faPencilAlt} /> Edit
                  </th>
                  <th>
                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects?.map((pd, idx) => (
                  <tr key={pd?._id}>
                    <td>{idx + 1}</td>
                    <td>
                      <Image
                        src={pd?.thumbnail?.photo}
                        width={80}
                        height={50}
                        style={{ objectFit: "cover" }}
                        alt={`image-${pd?.title}`}
                      />
                    </td>
                    <td>{pd?.title?.slice(0, 30)}...</td>
                    <td>
                      <button onClick={() => handleUpdateOpen(pd?._id)}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                    </td>
                    <td>
                      <button>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className={styles.update}>
          {updateOpen && (
            <UpdateP
              id={projId}
              setOpen={setUpdateOpen}
              onUpdate={handleProjectUpdate}
            />
          )}
        </div>
      </section>
    </aside>
  );
};

export default Project;
