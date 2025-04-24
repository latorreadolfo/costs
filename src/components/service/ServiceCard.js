import styles from '../project/ProjectCard.module.css';

import { BsFillTrashFill } from 'react-icons/bs';

function ServiceCard({ id, name, cost, description, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id, cost);
  };

  return (
    <div className={styles.card_container}>
      <h4>{name}</h4>
      <p>
        <span>Total cost:</span> USD $
        {Number(cost).toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </p>
      <p>{description}</p>
      <div
        style={{ justifyContent: 'flex-end' }}
        className={styles.btn_container}
      >
        <button onClick={remove}>
          <BsFillTrashFill /> Delete
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
