import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import { getArticles } from "../reducers/articles-reducer";
import { getPostReducer } from "../reducers/post-reduces";
import { postUser } from "../reducers/user-reducer";

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
