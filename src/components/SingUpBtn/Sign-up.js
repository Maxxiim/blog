import { useNavigate } from "react-router-dom";

import styles from "./signUp.module.scss";

const SignUp = () => {
  const navigate = useNavigate();

  const navigateToRegistration = () => {
    navigate("/sign-up");
  };

  return (
    <div>
      <button
        onClick={() => navigateToRegistration()}
        className={`
      ${styles["btn"]} 
      ${styles["btn__up"]} `}
      >
        Sign up
      </button>
    </div>
  );
};

export default SignUp;
