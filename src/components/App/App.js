import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Header from "../header/Header";
import UserHeader from "../UserHeader/UserHeader";
import Posts from "../Posts/Posts";
import Post from "../Post/Post";
import Pagination from "../Pagination/Pagination";
import Registration from "../Registration/Registration";
import AuthForm from "../AuthForm/AuthForm";
import EditProfile from "../EditProfile/EditProfile";
import { successUser } from "../../redux/action/user-action";
import NewArticle from "../NewArticle/New-article";

import styles from "./app.module.scss";

const App = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const localStoreData = localStorage.getItem("userData");
    const parseLocalStoreData = localStoreData
      ? JSON.parse(localStoreData)
      : null;

    if (parseLocalStoreData) {
      dispatch(successUser(parseLocalStoreData));
    } else return;
  });

  return (
    <div>
      {isAuth ? <UserHeader /> : <Header />}
      <div className={`${styles["container"]}`}>
        <Routes>
          {
            <Route
              path="/"
              element={
                <>
                  <Posts />
                  <Pagination />
                </>
              }
            />
          }

          <Route
            path="/articles"
            element={
              <>
                <Posts />
                <Pagination />
              </>
            }
          />
          <Route path="/articles/:slug" element={<Post />} />
          <Route path="/sign-up" element={<Registration />} />
          <Route path="/sign-in" element={<AuthForm />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/new-article" element={<NewArticle />} />
          <Route path="/articles/:slug/edit" element={<NewArticle />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
