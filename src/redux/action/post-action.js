export const postRequest = () => {
  return { type: "POST_REQUEST" };
};

export const postSuccess = (payload) => {
  return { type: "POST_SUCCESS", payload };
};

export const postError = (payload) => {
  return { type: "POST_ERROR", payload };
};
