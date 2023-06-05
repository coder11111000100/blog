import { nanoid } from '@reduxjs/toolkit';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Article } from '../Article/Article';
import { ArticlePagination } from '../Pagination/Pagination';
import { Preloader } from '../Preloader/Preloader';
import { articlesLoadList } from '../../store/reducer';
import styles from './ArticleList.module.scss';

function ArticleList() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.article.articles);
  const loading = useSelector((state) => state.article.articlesLoader);
  const error = useSelector((state) => state.article.articlesError);
  useEffect(() => {
    dispatch(articlesLoadList());
  }, [dispatch]);

  if (error) {
    return (
      <div className={styles['error']}>
        <h3> {error} </h3>
      </div>
    );
  }

  return !loading ? (
    <>
      <section className={styles['container-list']}>
        {articles.map((article) => (
          <Article key={nanoid()} article={article} />
        ))}
      </section>
      <ArticlePagination />
    </>
  ) : (
    <Preloader />
  );
}

export { ArticleList };
