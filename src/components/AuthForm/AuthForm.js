import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { postAuthUser } from "../../api/auth-api";
import { requestUser, successUser } from "../../redux/action/user-action";

import styles from "./authForm.module.scss";

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const localStoreData = localStorage.getItem("userData");
    const parseData = localStoreData ? JSON.parse(localStoreData) : null;

    if (parseData) {
      dispatch(successUser(parseData));
    }
  }, [dispatch]);

  const submitData = async (data) => {
    dispatch(requestUser());
    try {
      const formdata = {
        user: {
          email: data.email,
          password: data.password,
        },
      };

      const response = await postAuthUser(formdata);
      const { token, email, username } = response.user;

      dispatch(successUser({ token, email, username }));

      localStorage.setItem("userData", JSON.stringify(response.user));
      navigate("/");
    } catch (error) {
      if (error.status === 422) {
        const serverError = error.error.errors;

        if (serverError) {
          setError("form", {
            type: "manual",
            message: "Неверный логин или пароль",
          });
        }

        if (serverError) {
          setError("email", {
            type: "manual",
          });
        }

        if (serverError) {
          setError("password", {
            type: "manual",
          });
        }
      }
    }
  };

  return (
    <div className={`${styles["auth"]}`}>
      <div className={styles.registr}>
        <h4 className={styles.registr__title}>Sign In</h4>
        <form
          className={styles["signup-form"]}
          onSubmit={handleSubmit(submitData)}
          {...register("form", {
            pattern: { message: "Неверный логин или пароль." },
          })}
        >
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
                required: "Поле не должно быть пустым",
                minLength: { value: 6, message: "минимум 6 символов" },
                maxLength: { value: 40, message: "минимум 40 символов" },
              })}
              className={`${styles.input} ${errors.password ? styles.err : ""}`}
              type="password"
              id="password"
              placeholder="Password"
              required
            />
            {errors.password && (
              <span className={styles.error__message} role="alert">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className={`${styles["btn"]} ${styles["signup-button"]}`}
          >
            Login
          </button>
          {errors.form && (
            <span className={styles.error__message} role="alert">
              {errors.form.message}
            </span>
          )}
        </form>
        <p className={`${styles["registr__haveAcc"]}`}>
          Don’t have an account?
          <Link to="/sign-up" className={`${styles["registr__haveAcc-link"]}`}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
