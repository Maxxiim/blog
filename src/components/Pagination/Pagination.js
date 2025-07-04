import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "antd";

import { changeCurrentPage } from "../../redux/action/articles-action";

import styles from "./pagination.module.scss";

const PaginationComp = () => {
  const dispatch = useDispatch();

  const { limit, totalArticles, currentPage, loading } = useSelector(
    (state) => state.articles,
  );

  if (loading) return;

  return (
    <ul className={`${styles["pagination"]}`}>
      <Pagination
        current={currentPage}
        total={totalArticles}
        pageSize={limit}
        onChange={(page) => dispatch(changeCurrentPage(page))}
        showSizeChanger={false}
      />
    </ul>
  );
};

export default PaginationComp;
