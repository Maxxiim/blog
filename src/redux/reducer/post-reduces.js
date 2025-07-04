const initialState = {
  obj: null,
  loading: false,
  error: null,
  slug: null,
};

export const getPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_REQUEST": {
      return { ...state, loading: true, error: null };
    }
    case "POST_SUCCESS": {
      return { ...state, obj: action.payload, loading: false };
    }
    case "UPDATE_ARTICLE": {
      return { ...state, obj: action.payload };
    }
    case "POST_ERROR": {
      return { ...state, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
