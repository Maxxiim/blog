export const requestUser = () => ({ type: "REQUEST_USER" });

export const successUser = (userData) => ({
  type: "SUCCESS_USER",
  payload: userData,
});

export const errorUser = (errorMsg) => ({
  type: "ERROR_USER",
  payload: errorMsg,
});

export const logOutUser = () => ({ type: "LOGOUT_USER" });
