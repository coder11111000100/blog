import ReactMarkdown from 'react-markdown';
import { HeartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import styles from './ArticleDetails.module.scss';
import { DeleteArticle } from '../../store/reducer';

function ArticleDetails() {
  const [confirm, setconfirm] = useState(false);

  const dispatch = useDispatch();
  const slugTo = useParams();
  const navigate = useNavigate();
  const article = useSelector((state) => {
    const artArr = state.article.articles;
    const res = artArr.find((item) => {
      const { slug } = slugTo;
      return item.slug === slug;
    });
    return res;
  });

  useEffect(() => {});
  const { author, title, description, tagList, createdAt, updatedAt, body, favoritesCount } = article;
  const { username, image } = author;
  const isUser = useSelector((state) => {
    const name = state.user?.user?.user?.username;
    return name === username;
  });

  const goEdit = () => {
    const { slug } = slugTo;
    navigate(`/articles/${slug}/edit`);
  };

  const onDeleteHandler = () => {
    setconfirm(true);
  };

  const notDelete = () => {
    setconfirm(false);
  };
  const onDelete = () => {
    const { slug } = slugTo;
    dispatch(DeleteArticle(slug)).then(() => {
      setconfirm(false);
      navigate('/');
    });
  };

  return (
    <article>
      <div className={styles['article-conteiner']}>
        <div className={styles['article-conteiner__head']}>
          {isUser && (
            <div className={styles['article-conteiner__button']}>
              <button type="button" onClick={onDeleteHandler}>
                delete
              </button>
              <button type="button" onClick={goEdit}>
                edit
              </button>
            </div>
          )}
          {confirm && (
            <div className={styles['article-conteiner__confirmation']}>
              <span>Are you sure to delete this article?</span>
              <div className={styles['article-conteiner__confirmation-button']}>
                <button type="button" onClick={notDelete}>
                  No
                </button>
                <button type="button" onClick={onDelete}>
                  Yes
                </button>
              </div>
            </div>
          )}

          <div className={styles['article-conteiner__title']}>
            <div className={styles['article-conteiner__title-item1']}>
              <h5>
                <ReactMarkdown>{title}</ReactMarkdown>
              </h5>
              <HeartOutlined className={styles['article-conteiner__heart']} style={{}} />
              {/* <HeartFilled style={{ color: 'red' }} /> */}
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
          <span>
            <ReactMarkdown>{body}</ReactMarkdown>
          </span>
        </div>
      </div>
    </article>
  );
}

export { ArticleDetails };
