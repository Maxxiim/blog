import { useNavigate } from "react-router-dom";

import styles from "./edit-btn.module.scss";

const EditBtn = ({ slug }) => {
  const navigate = useNavigate();

  const sendSlugPostEdit = async (slug) => {
    navigate(`/articles/${slug}/edit`);
  };

  return (
    <div>
      <button
        className={`${styles["btn"]} ${styles["btn-edit"]}`}
        onClick={() => sendSlugPostEdit(slug)}
      >
        Edit
      </button>
    </div>
  );
};

export default EditBtn;
