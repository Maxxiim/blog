import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./user.module.scss";
const User = () => {
  const dataUser = useSelector((state) => state.user.user);
  return (
    <Link to="/profile">
      <div className={styles.user}>
        <p className={styles.user__name}>{dataUser.username}</p>
        <img className={styles.user__img} src={dataUser.image} alt="" />
      </div>
    </Link>
  );
};

export default User;
