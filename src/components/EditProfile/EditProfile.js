import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import updateUser from "../../redux/api/upd-user-api";
import { successUser } from "../../redux/action/user-action";

import styles from "./edit-profile.module.scss";

const EditProfile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user?.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submit = async (data) => {
    try {
      const dataForServer = {};

      if (data.username?.trim() && data.username !== user.username) {
        dataForServer.username = data.username.trim();
      }

      if (data.email?.trim() && data.email !== user.email) {
        dataForServer.email = data.email.trim();
      }

      if (data.password?.trim()) {
        dataForServer.password = data.password;
      }

      if (data.avatar?.trim() && data.avatar !== user.image) {
        dataForServer.image = data.avatar.trim();
      }

      if (Object.keys(dataForServer).length === 0) {
        alert("Нет изменений для отправки");
        return;
      }

      const updatedUser = await updateUser(dataForServer);
      console.log("Пользователь обновлён:", updatedUser);

      localStorage.setItem("userData", JSON.stringify(updatedUser.user));

      dispatch(successUser(updatedUser.user));
      reset({
        username: "",
        email: "",
        password: "",
        avatar: "",
      });

      return updatedUser;
    } catch (error) {
      console.error("Failed to update user:", error);

      const message =
        error?.data?.errors?.email?.[0] ||
        error?.data?.errors?.username?.[0] ||
        error?.data?.message ||
        JSON.stringify(error);

      alert("Ошибка при обновлении: " + message);
    }
  };

  return (
    <div className={styles.registr}>
      <h4 className={styles.registr__title}>Edit Profile</h4>
      <form className={styles["signup-form"]} onSubmit={handleSubmit(submit)}>
        <div className={styles["form-group"]}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            {...register("username", {
              validate: (value) => {
                if (value.length > 0 && value.length < 3) {
                  return "Минимум 3 символа";
                }
                return true;
              },
              maxLength: {
                value: 20,
                message: "Максимум 20 символов",
              },
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
              validate: (value) => {
                if (value.length === 0) return true;
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  return "Введите корректный email";
                }
                return true;
              },
            })}
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
            New password
          </label>
          <input
            {...register("password", {
              validate: (value) => {
                if (value.length === 0) return true;
                if (value.length < 6) return "Минимум 6 символов";
                if (value.length > 40) return "Максимум 40 символов";
                return true;
              },
            })}
            className={`${styles.input} ${errors.password ? styles.err : ""}`}
            type="password"
            id="password"
            placeholder="New password"
          />
          {errors.password && (
            <span className={styles.error__message}>
              {errors.password.message}
            </span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label className={styles.label} htmlFor="avatar">
            Avatar image (url)
          </label>
          <input
            {...register("avatar", {
              validate: (value) => {
                if (value.length === 0) return true;
                try {
                  new URL(value);
                  if (!/\.(png|jpg|jpeg|gif|webp)$/i.test(value)) {
                    return "URL должен вести на изображение (png, jpg, jpeg, gif, webp)";
                  }
                  return true;
                } catch {
                  return "Введите корректный URL";
                }
              },
            })}
            className={`${styles.input} ${errors.avatar ? styles.err : ""}`}
            type="text"
            id="avatar"
            placeholder="Avatar image"
          />
          {errors.avatar && (
            <span className={styles.error__message}>
              {errors.avatar.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className={`${styles["btn"]} ${styles["signup-button"]}`}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
