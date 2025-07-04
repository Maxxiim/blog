import { useNavigate } from "react-router-dom";

import CreateArticle from "../CreateBtn/CreateArticle";
import LogOut from "../LogOutBtn/LogOut";
import User from "../User/User";

import styles from "./userheader.module.scss";

const UserHeader = () => {
  const navigate = useNavigate();

  const changePage = () => {
    navigate("/articles");
  };
  return (
    <div>
      <header className={`${styles["header"]}`}>
        <div className={`${styles["header__wrapper"]}`}>
          <h1
            className={`${styles["header__descr"]}`}
            onClick={() => changePage()}
          >
            Realworld Blog
          </h1>
          <div className={`${styles["header__block"]}`}>
            <CreateArticle />
            <User />
            <LogOut />
          </div>
        </div>
      </header>
    </div>
  );
};

export default UserHeader;
