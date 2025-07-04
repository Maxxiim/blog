import {
  articlesRequest,
  articlesSuccess,
  setError,
} from "../action/articles-action";

const fetchArticles = (page, limit) => async (dispatch) => {
  const offset = (page - 1) * limit;
  dispatch(articlesRequest());
  try {
    const url = `https://blog-platform.kata.academy/api/articles?limit=${limit}&offset=${offset}`;

    const response = await fetch(url);
    const data = await response.json();

    const listArticles = data.articles;
    const totalArticles = data.articlesCount;

    dispatch(articlesSuccess({ listArticles, totalArticles }));
  } catch (err) {
    dispatch(
      setError({
        message: err.message,
        status: err.response?.status || 500,
      }),
    );
  }
};

export default fetchArticles;
