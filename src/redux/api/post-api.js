import { postRequest, postSuccess, postError } from "../action/post-action";

export const getPost = (slug) => async (dispatch) => {
  if (!slug) return;
  dispatch(postRequest());
  try {
    const url = `https://blog-platform.kata.academy/api/articles/${slug}`;

    const response = await fetch(url);
    const data = await response.json();

    const article = data.article;
    dispatch(postSuccess(article));
  } catch (error) {
    dispatch(
      postError({
        message: error.message,
        status: error.response?.status || 500,
      }),
    );
  }
};
