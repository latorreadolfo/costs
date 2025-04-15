import { Link } from "react-router-dom";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

import styles from "./ProjectCard.module.css";

function ProjectCard({ id, name, budget, category, handleRemove }) {
  return (
    <div className={styles.card_container}>
      <h4>{name}</h4>
      <p>
        <span>Budget:</span> U$D {budget},00
      </p>
      <p className={styles.category_text}>
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>
      <div className={styles.btn_container}>
        <Link to="/">
          <BsPencil /> Edit
        </Link>
        <button>
          <BsFillTrashFill /> Delete
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
