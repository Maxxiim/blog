import { useNavigate } from "react-router-dom";

import SignIn from "../SignInBtn/Sign-In";
import SignUp from "../SingUpBtn/Sign-up";

import styles from "./header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const changePage = () => {
    navigate("/articles");
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <h1 className={styles.header_descr} onClick={() => changePage()}>
          Realworld Blog
        </h1>
        <div className={styles.header__block}>
          <SignIn />
          <SignUp />
        </div>
      </div>
    </header>
  );
};

export default Header;
