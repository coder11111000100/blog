import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';
import { NavLink } from 'react-router-dom';
import { format } from 'date-fns';
import styles from './Article.module.scss';
import { setFavorite, deleteFavorite } from '../../store/reducer';

function Article({ article }) {
  const dispatch = useDispatch();
  const { slug, author, title, description, tagList, createdAt, updatedAt, favorited, favoritesCount } = article;
  const { username, image } = author;

  const onHeightFavoriteCount = () => {
    if (favorited) {
      dispatch(deleteFavorite(slug));
    } else {
      dispatch(setFavorite(slug));
    }
  };

  return (
    <article>
      <div className={styles['article-conteiner']}>
        <div className={styles['article-conteiner__head']}>
          <div className={styles['article-conteiner__title']}>
            <div className={styles['article-conteiner__title-item1']}>
              <h5>
                <NavLink style={{ textDecoration: 'none', wordWrap: 'anywhere' }} to={`/articles/${slug}`}>
                  <ReactMarkdown>{title}</ReactMarkdown>
                </NavLink>
              </h5>
              {favorited ? (
                <HeartFilled
                  aria-hidden="true"
                  onClick={onHeightFavoriteCount}
                  style={{ color: 'red', marginLeft: '10px' }}
                />
              ) : (
                <HeartOutlined
                  aria-hidden="true"
                  onClick={onHeightFavoriteCount}
                  className={styles['article-conteiner__heart']}
                />
              )}

              <span className={styles['article-conteiner__heart-count']}>{favoritesCount}</span>
            </div>
            <div className={styles['article-conteiner__tags']}>
              {tagList.map((tag) => (
                <span key={nanoid()}>{tag}</span>
              ))}
            </div>
          </div>

          <div className={styles['article-conteiner__info']}>
            <div className={styles['article-conteiner__name']}>{username}</div>
            <div className={styles['article-conteiner__date']}>
              {updatedAt ? format(new Date(updatedAt), 'PP') : format(new Date(createdAt), 'PP')}
            </div>
          </div>
          <div className={styles['article-conteiner__logo']}>
            <img src={image} alt="logo" />
          </div>
        </div>

        <div className={styles['article-conteiner__description']}>
          <span>
            <ReactMarkdown>{description}</ReactMarkdown>
          </span>
        </div>
      </div>
    </article>
  );
}

export { Article };
