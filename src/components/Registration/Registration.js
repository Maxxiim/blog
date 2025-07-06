import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import postCreateUser from "../../api/createUser-api";
import {
  requestUser,
  successUser,
  errorUser,
} from "../../redux/action/user-action";

import styles from "./registration.module.scss";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const sumbit = async (data) => {
    try {
      dispatch(requestUser());

      const dataForServer = {
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      };
      const response = await postCreateUser(dataForServer);

      const { username, email, token } = response.user;

      dispatch(
        successUser({
          username,
          email,
          token,
        }),
      );

      localStorage.setItem("userData", JSON.stringify(response.user));

      navigate("/");
    } catch (error) {
      if (error.status === 422) {
        const serverErrors = error.data.errors;

        if (serverErrors.username) {
          setError("username", {
            type: "manual",
            message: "Ах ты сука! Придумай что-то новое!",
          });
        }

        if (serverErrors.email) {
          setError("email", {
            type: "manual",
            message: "Ах ты сука! Придумай что-то новое!",
          });
        }
        dispatch(errorUser("Ошибка валидации данных"));
      } else {
        dispatch(errorUser("Ошибка сервера"));
        alert("Произошла ошибка: " + error.message);
      }
    }
  };

  const password = watch("password");

  return (
    <div className={styles.registr}>
      <h4 className={styles.registr__title}>Create new account</h4>
      <form className={styles["signup-form"]} onSubmit={handleSubmit(sumbit)}>
        <div className={styles["form-group"]}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            {...register("username", {
              required: "Обязательное поле",
              minLength: { value: 3, message: "Минимум 3 символа" },
              maxLength: { value: 20, message: "Максимум 20 символов" },
            })}
            className={`${styles.input} ${errors.username ? styles.err : ""}`}
            type="text"
            id="username"
            placeholder="Username"
          />
          {errors.username && (
            <span className={styles.error__message}>
              {errors.username.message}
            </span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label className={styles.label} htmlFor="email">
            Email address
          </label>
          <input
            {...register("email", {
              required: "Поле не должно быть пустым",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Введите корректный email",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
            className={`${styles.input} ${errors.email ? styles.err : ""}`}
            type="email"
            id="email"
            placeholder="Email address"
          />
          {errors.email && (
            <span className={styles.error__message} role="alert">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            {...register("password", {
              minLength: { value: 6, message: "Минимум 6 символов" },
              maxLength: { value: 20, message: "Максимум 20  символов" },
              required: true,
            })}
            className={`${styles.input} ${errors.password ? styles.err : ""}`}
            type="password"
            id="password"
            placeholder="Password"
            required
          />
          {errors.password && (
            <span className={styles.error__message}>
              {errors.password.message}
            </span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label className={styles.label} htmlFor="confirm-password">
            Repeat Password
          </label>
          <input
            {...register("confirmPassword", {
              validate: (value) => value === password || "Пароли не совпадают",
            })}
            className={`${styles.input} ${
              errors.confirmPassword ? styles.err : ""
            }`}
            type="password"
            id="confirm-password"
            placeholder="Repeat Password"
          />
          {errors.confirmPassword && (
            <span className={styles.error__message}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <div className={`${styles["form-group__agree"]}`}>
          <input
            {...register("agree", {
              required: true,
            })}
            className={styles.input__agree}
            type="checkbox"
            id="agree-terms"
            required
          />
          <label className={styles.label__agree} htmlFor="agree-terms">
            I agree to the processing of my personal information
          </label>
        </div>

        <button
          type="submit"
          className={`${styles["btn"]} ${styles["signup-button"]}`}
        >
          Create
        </button>
      </form>
      <p className={`${styles["registr__haveAcc"]}`}>
        Already have an account?
        <Link to="/sign-in" className={`${styles["registr__haveAcc-link"]}`}>
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Registration;
