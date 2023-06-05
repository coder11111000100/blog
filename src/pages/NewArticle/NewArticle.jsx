/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { newArticle, UpdateArticle } from '../../store/reducer';
import styles from './NewArticle.module.scss';

function NewArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const elem = useSelector((state) => {
    if (slug) {
      const articles = state.article.articles;
      return articles.find((article) => article.slug === slug);
    }
    return '';
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: elem.title,
      body: elem.body || '',
      description: elem.description || '',
      tagList: elem.tagList || [' '],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const onSubmit = (data) => {
    dispatch(slug ? UpdateArticle({ data, slug }) : newArticle(data))
      .unwrap()
      .then(() => {
        reset();
        navigate('/');
      });
  };

  return (
    <div className={styles['container']}>
      <div className={styles['container__title']}>
        <span>Create new article</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['container__create-form']} action="">
        <div>
          <span>Title</span>
          <input
            {...register('title', {
              required: { value: true, message: 'поле обязально для заполнения' },
            })}
            type="text"
          />
          <div className={styles.error}>
            <span>{errors && errors?.email?.message}</span>
          </div>
        </div>
        <div>
          <span>Short description</span>
          <input
            {...register('description', {
              required: { value: true, message: 'поле обязально для заполнения' },
            })}
            type="text"
          />
          <div className={styles.error}>
            <span>{errors && errors?.password?.message}</span>
          </div>
        </div>
        <div>
          <span>Text</span>
          <textarea
            {...register('body', {
              required: { value: true, message: 'поле обязально для заполнения' },
            })}
            type="text"
          />
          <div className={styles.error}>
            <span>{errors && errors?.password?.message}</span>
          </div>
        </div>

        <div className={styles['container__tags']}>
          <span>Tags</span>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <input type="text" {...register(`tagList.${index}`)} />
                <button
                  type="button"
                  onClick={() => {
                    if (index === 0) {
                      return;
                    }
                    remove(index);
                  }}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
        <span className={styles['container__add-tags']}>
          <button type="button" onClick={() => append('')}>
            Add tag
          </button>
        </span>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export { NewArticle };
