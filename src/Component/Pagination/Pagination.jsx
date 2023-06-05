import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { pageArticles } from '../../store/reducer';
import styles from './Pagination.module.scss';

function ArticlePagination() {
  const currentPage = useSelector((state) => state.article.articlePage);
  const articleTotalPage = useSelector((state) => state.article.articleTotalPage);
  const dispatch = useDispatch();

  const onChange = (page) => {
    dispatch(pageArticles(page));
  };
  return (
    <div className={styles['conainer']}>
      <Pagination
        className={styles['conainer__pagination']}
        current={currentPage}
        onChange={onChange}
        total={articleTotalPage}
      />
    </div>
  );
}

export { ArticlePagination };
