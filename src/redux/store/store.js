import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import { getArticles } from "../reducer/articles-reducer";
import { getPostReducer } from "../reducer/post-reduces";
import { postUser } from "../reducer/user-reducer";

const rootCombine = combineReducers({
  articles: getArticles,
  post: getPostReducer,
  user: postUser,
});

const store = createStore(
  rootCombine,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
