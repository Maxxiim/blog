export const articlesRequest = () => {
  return { type: "ARTICLES_REQUEST" };
};

export const articlesSuccess = ({ listArticles, totalArticles }) => {
  return {
    type: "ARTICLES_SUCCESS",
    payload: {
      listArticles: listArticles,
      totalArticles: totalArticles,
    },
  };
};

export const changeTotalPages = (payload) => {
  return { type: "UPDATE_PAGES", payload };
};

export const changeCurrentPage = (payload) => {
  return { type: "CHANGE_CURRENT_PAGE", payload };
};

export const setError = (payload) => {
  return { type: "SET_ERROR", payload };
};
