"use client";

import SmallLoad from "@/components/smallLaoding/smallLoad";
import { useLoading } from "@/customHooks";
import { api } from "@/data/api";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import CreateProject from "./post/createProject";
import styles from "./project.module.css";
import ShowP from "./showP";

const Project = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [newProject, setNewProject] = useState({});
  const { loading, startLoading, stopLoading } = useLoading();

  const [projects, setProjects] = useState([]);

  const fetchProjData = useCallback(async () => {
    startLoading();
    try {
      const response = await fetch(`${api}/project/allProjects`, {
        cache: "no-store",
      });
      const response2 = await response.json();
      setProjects(response2?.data);
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    fetchProjData();
  }, [fetchProjData]);

  useEffect(() => {
    if (newProject && newProject?._id) {
      setProjects((prev) => {
        const exists = prev.some((p) => p._id === newProject._id);
        return exists ? prev : [newProject, ...prev];
      });
    }
  }, [newProject]);

  const handleProjectUpdate = (updatedProj) => {
    setProjects((prev) =>
      prev.map((p) => (p._id === updatedProj._id ? updatedProj : p)),
    );
  };

  const handleProjectCut = (projId) => {
    setProjects((prev) => prev.filter((p) => p._id !== projId));
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
            <>
              {projects?.length > 0 ? (
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
                      <ShowP
                        data={pd}
                        handleProjectUpdate={handleProjectUpdate}
                        handleProjectCut={handleProjectCut}
                        idx={idx}
                        key={pd?._id}
                      />
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: "#ff0263", fontWeight: "bold" }}>
                  No longer project Data
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </aside>
  );
};

export default Project;
