import { useNavigate } from "react-router-dom";
import ProjectForm from "../project/ProjectForm";

import styles from "./NewProject.module.css";

function NewProject() {
  const navigate = useNavigate();

  function createPost(project) {
    // initialize cost and services
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        navigate("/projects", { message: "Project created successfully!" });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Create Project</h1>
      <p>Create your project before adding services.</p>
      <ProjectForm handleSubmit={createPost} btnText="Create New Project" />
    </div>
  );
}

export default NewProject;
