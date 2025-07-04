import { useNavigate } from "react-router-dom";

import styles from "./create-article.module.scss";

const CreateArticle = () => {
  const navigate = useNavigate();

  const pathToCreateArticle = () => {
    navigate("/new-article");
  };
  return (
    <div>
      <button
        onClick={() => pathToCreateArticle()}
        className={`${styles.btn} ${styles["btn-create"]}`}
      >
        Create article
      </button>
    </div>
  );
};

export default CreateArticle;
