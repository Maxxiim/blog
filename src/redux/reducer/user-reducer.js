const initialState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

export const postUser = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_USER": {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case "SUCCESS_USER": {
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        isLoading: false,
      };
    }

    case "ERROR_USER": {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }

    case "LOGOUT_USER": {
      return initialState;
    }

    default:
      return state;
  }
};
