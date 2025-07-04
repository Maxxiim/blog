import { useEffect } from "react";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import profile from "../../img/user/profile.svg";
import fetchArticles from "../../redux/api/articles-api";
import { getPost } from "../../redux/api/post-api";
import Spinner from "../Spinner/Spinner";
import likeArticle from "../../redux/api/like-article-api";
import dislikeArticle from "../../redux/api/dislike-article-api";

import styles from "./posts.module.scss";

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentPage, limit, listArticles, loading } = useSelector(
    (state) => state.articles,
  );
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    dispatch(fetchArticles(currentPage, limit));
  }, [dispatch, currentPage, limit]);

  const sendSlugPost = async (slug) => {
    await dispatch(getPost(slug));
    navigate(`/articles/${slug}`);
  };

  const toggleLikePost = async (slug, favorited) => {
    if (!isAuth) return;

    try {
      let updatedArticle;
      if (favorited) {
        updatedArticle = await dislikeArticle(slug);
      } else {
        updatedArticle = await likeArticle(slug);
      }
      dispatch({
        type: "UPDATE_ARTICLE",
        payload: updatedArticle.article || updatedArticle,
      });
    } catch (error) {
      console.error("Ошибка в toggleLikePost:", error);
    }
  };

  if (loading) return <Spinner />;

  return (
    <ul className={`${styles["posts__list"]}`}>
      {listArticles.map((item) => {
        const img = item.author.image ? item.author.image : profile;
        return (
          <li className={`${styles["posts__item"]}`} key={item.slug}>
            <div className={`${styles["posts__item-header"]}`}>
              <div className={`${styles["posts__item-header-title-block"]}`}>
                <h4
                  className={`${styles["posts__item-header-block-title"]}`}
                  onClick={() => sendSlugPost(item.slug)}
                >
                  {item.title}
                </h4>
                <div className={`${styles["posts__item-header-rating"]}`}>
                  <button
                    className={`${styles["btn__like"]}`}
                    onClick={() => toggleLikePost(item.slug, item.favorited)}
                    type="button"
                  >
                    <svg
                      className={
                        item.favorited
                          ? styles["posts__item-header-rating-like_active"]
                          : styles["posts__item-header-rating-like"]
                      }
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.99998 15.1099C7.7722 15.1099 7.5526 15.0273 7.38146 14.8774C6.73509 14.3123 6.11193 13.7811 5.56212 13.3126L5.55932 13.3102C3.94738 11.9365 2.55542 10.7502 1.58691 9.58167C0.504272 8.27527 0 7.03662 0 5.68347C0 4.36877 0.450805 3.15588 1.26928 2.26807C2.09753 1.36975 3.234 0.875 4.46972 0.875C5.3933 0.875 6.23912 1.16699 6.98363 1.7428C7.35936 2.03345 7.69994 2.38916 7.99998 2.80408C8.30015 2.38916 8.64061 2.03345 9.01646 1.7428C9.76097 1.16699 10.6068 0.875 11.5304 0.875C12.766 0.875 13.9026 1.36975 14.7308 2.26807C15.5493 3.15588 16 4.36877 16 5.68347C16 7.03662 15.4958 8.27527 14.4132 9.58154C13.4447 10.7502 12.0528 11.9364 10.4411 13.3099C9.89036 13.7792 9.26622 14.3112 8.61839 14.8777C8.44737 15.0273 8.22765 15.1099 7.99998 15.1099ZM4.46972 1.81226C3.49889 1.81226 2.60705 2.19971 1.95825 2.90332C1.2998 3.61755 0.937132 4.60486 0.937132 5.68347C0.937132 6.82153 1.3601 7.83936 2.30847 8.98364C3.22509 10.0897 4.58849 11.2516 6.1671 12.5969L6.17003 12.5994C6.72191 13.0697 7.34752 13.6029 7.99864 14.1722C8.65367 13.6018 9.28026 13.0677 9.83323 12.5967C11.4117 11.2513 12.775 10.0897 13.6916 8.98364C14.6399 7.83936 15.0628 6.82153 15.0628 5.68347C15.0628 4.60486 14.7002 3.61755 14.0417 2.90332C13.393 2.19971 12.5011 1.81226 11.5304 1.81226C10.8192 1.81226 10.1662 2.03833 9.5897 2.48413C9.07591 2.88159 8.718 3.38403 8.50816 3.7356C8.40025 3.91638 8.21031 4.02429 7.99998 4.02429C7.78966 4.02429 7.59972 3.91638 7.49181 3.7356C7.28209 3.38403 6.92418 2.88159 6.41027 2.48413C5.83373 2.03833 5.18078 1.81226 4.46972 1.81226Z"
                        fill=""
                        fillOpacity="0.75"
                      />
                    </svg>
                  </button>
                  <span
                    className={`${styles["posts__item-header-rating-count"]}`}
                  >
                    {item.favoritesCount}
                  </span>
                </div>
              </div>
              <div className={`${styles["posts__item-header-user"]}`}>
                <div className={`${styles["posts-header-user-block"]}`}>
                  <span className={`${styles["posts__item-header-user-name"]}`}>
                    {item.author.username}
                  </span>
                  <span className={`${styles["posts__item-header-user-date"]}`}>
                    {format(new Date(item.createdAt), "MMMM dd,yyyy")}
                  </span>
                </div>
                <a>
                  <img
                    className={`${styles["posts-header-user-img"]}`}
                    src={img}
                    alt={`images${item.author.username}`}
                  />
                </a>
              </div>
            </div>
            <div className={`${styles["posts__item-descr"]}`}>
              <ul className={`${styles["posts__item-descr-tags"]}`}>
                {item.tagList.map((tag, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        index === 0
                          ? styles["posts__item-descr-tag__active"]
                          : styles["posts__item-descr-tag"]
                      }
                    >
                      {tag}
                    </li>
                  );
                })}
              </ul>
              <p className={`${styles["posts__item-descr-text"]}`}>
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Posts;
