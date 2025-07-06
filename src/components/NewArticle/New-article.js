import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import createNewArticle from "../../api/newArticle-api";
import { getPost } from "../../redux/thunks/post-api";
import updateArticle from "../../api/upd-article-api";
import fetchArticles from "../../redux/thunks/articles-api";
import { postSuccess } from "../../redux/action/post-action";

import styles from "./new-article.module.scss";

const NewArticle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const postArticle = useSelector((state) => state.post.obj);
  const { currentPage, limit } = useSelector((state) => state.articles);

  useEffect(() => {
    if (slug) {
      dispatch(getPost(slug));
    }
  }, [slug, dispatch]);

  const isEditMode = location.pathname === `/articles/${slug}/edit`;

  useEffect(() => {
    if (isEditMode && postArticle) {
      reset({
        title: postArticle.title,
        shortDescription: postArticle.description,
        textArea: postArticle.body,
      });
      const tagsFromPost = postArticle.tagList?.map((tag) => ({
        id: Date.now() + Math.random(),
        value: tag,
      })) || [{ id: Date.now(), value: "" }];
      setTags(tagsFromPost);
    }
  }, [isEditMode, postArticle]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [tags, setTags] = useState([{ id: Date.now(), value: "" }]);

  const handleInputChange = (index, e) => {
    const newTags = [...tags];
    newTags[index].value = e.target.value;
    setTags(newTags);
  };

  const addTag = () => {
    setTags([...tags, { id: Date.now(), value: "" }]);
  };

  const deleteTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const submit = async (data) => {
    const nonEmptyTags = tags.filter((tag) => tag.value.trim().length > 0);
    const dataForServer = {
      article: {
        title: data.title,
        description: data.shortDescription,
        body: data.textArea.trim(),
        tagList: nonEmptyTags.map((tag) => tag.value),
      },
    };

    try {
      if (isEditMode) {
        await updateArticle(slug, dataForServer);
        dispatch(postSuccess(null));
        dispatch(fetchArticles(currentPage, limit));
        navigate(`/articles/${slug}`);
      } else {
        await createNewArticle(dataForServer);
        dispatch(fetchArticles(currentPage, limit));
        navigate("/articles");
      }
    } catch (error) {
      console.error("Ошибка при отправке статьи:", error.message);
    }
  };

  return (
    <div className={styles.registr}>
      <h4 className={styles.registr__title}>
        {isEditMode ? "Edit article" : "Create new article"}
      </h4>
      <form className={styles["signup-form"]} onSubmit={handleSubmit(submit)}>
        <div className={styles["form-group"]}>
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <input
            {...register("title", { required: "Поле не должно быть пустым" })}
            className={`${styles.input} ${errors.title ? styles.err : ""}`}
            type="text"
            id="title"
            placeholder="Title"
          />
          {errors.title && (
            <span className={styles.error__message}>
              {errors.title.message}
            </span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label className={styles.label} htmlFor="shortDescription">
            Short description
          </label>
          <input
            {...register("shortDescription", {
              required: "Поле не должно быть пустым",
            })}
            className={`${styles.input} ${
              errors.shortDescription ? styles.err : ""
            }`}
            type="text"
            id="shortDescription"
            placeholder="Title"
          />
          {errors.shortDescription && (
            <span className={styles.error__message}>
              {errors.shortDescription.message}
            </span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label className={styles.label} htmlFor="textArea">
            Text
          </label>
          <textarea
            {...register("textArea", {
              required: "Поле не должно быть пустым",
            })}
            className={`${styles["textarea"]} ${
              errors.textArea ? styles.err : ""
            }`}
            type="text"
            id="textArea"
            placeholder="Text"
          />
          {errors.textArea && (
            <span className={styles.error__message}>
              {errors.textArea.message}
            </span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <ul className="tags__list">
            <p className={styles.label}>Tags</p>
            {tags.map((tag, index) => (
              <li key={tag.id} className={styles["tags__list-item"]}>
                <input
                  value={tag.value}
                  onChange={(e) => handleInputChange(index, e)}
                  className={styles["tags__list-item-input"]}
                  placeholder="Tag"
                />
                <button
                  className={`${styles.btn} ${styles.btn__delete}`}
                  type="button"
                  onClick={() => deleteTag(index)}
                >
                  Delete
                </button>
                {index === tags.length - 1 && (
                  <button
                    className={`${styles.btn} ${styles.btn__addTag}`}
                    type="button"
                    onClick={addTag}
                  >
                    Add tag
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          className={`${styles["btn"]} ${styles["send-button"]}`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
