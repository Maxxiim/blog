import { useNavigate } from "react-router-dom";

import styles from "./signIn.module.scss";

const SignIn = () => {
  const navigate = useNavigate();

  const navigateToAuthForm = () => {
    navigate("/sign-in");
  };

  return (
    <div>
      <button
        onClick={() => navigateToAuthForm()}
        className={`
      ${styles["btn"]} 
      ${styles["btn__in"]} `}
      >
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
