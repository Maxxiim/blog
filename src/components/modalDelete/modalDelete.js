import svgAttention from "../../img/modal-delete/icon_filled_suggested_exclamation-circle.svg";

import styles from "./modalDelete.module.scss";

const ModalDelete = ({ confirmDel }) => {
  return (
    <div className={styles.modalDelete}>
      <div className={`${styles["modalDelete__header"]}`}>
        <p className={`${styles["modalDelete__message"]}`}>
          <img
            className={`${styles["svgAttention"]}`}
            src={svgAttention}
            alt="icon attention delete article"
          ></img>
          Are you sure to delete this article?
        </p>
      </div>
      <button
        className={`${styles["btn"]}  ${styles["btn__no"]}`}
        onClick={() => confirmDel(false)}
        type="button"
      >
        No
      </button>
      <button
        className={`${styles["btn"]} ${styles["btn__yes"]}`}
        onClick={() => confirmDel(true)}
        type="button"
      >
        Yes
      </button>
    </div>
  );
};

export default ModalDelete;
