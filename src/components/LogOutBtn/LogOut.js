import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logOutUser } from "../../redux/action/user-action";

import styles from "./logOut.module.scss";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOutUser());
    if (localStorage.getItem("userData")) {
      localStorage.removeItem("userData");
    }
    navigate("/");
  };

  return (
    <div>
      <button
        className={`${styles.btn} ${styles["btn-logout"]}`}
        onClick={() => logout()}
      >
        Log Out
      </button>
    </div>
  );
};

export default LogOut;
