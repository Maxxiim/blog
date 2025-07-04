import styles from "./delete-btn.module.scss";

const DeleteBtn = ({ showModalDel }) => {
  return (
    <div className={styles.btn__delete}>
      <button
        className={`${styles["btn"]} ${styles["btn-edit"]}`}
        onClick={() => showModalDel()}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteBtn;
