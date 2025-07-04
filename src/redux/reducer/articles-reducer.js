const articlesState = {
  listArticles: [],
  totalArticles: 0,
  currentPage: 1,
  limit: 5,
  totalPage: 0,
  loading: false,
  error: null,
};

export const getArticles = (state = articlesState, action) => {
  switch (action.type) {
    case "ARTICLES_REQUEST":
      return { ...state, loading: true, error: null };
    case "ARTICLES_SUCCESS":
      return {
        ...state,
        listArticles: action.payload.listArticles,
        totalArticles: action.payload.totalArticles,
        loading: false,
      };
    case "UPDATE_ARTICLE":
      return {
        ...state,
        listArticles: state.listArticles.map((article) =>
          article.slug === action.payload.slug ? action.payload : article,
        ),
      };
    case "UPDATE_PAGES":
      return { ...state, totalPage: action.payload };
    case "CHANGE_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_ERROR": {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};
