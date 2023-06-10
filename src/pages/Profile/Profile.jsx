/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUserProfileAccount } from '../../store/UserReducer';
import styles from './Profile.module.scss';

function Profile() {
  const user = useSelector((state) => state.user.user.user);
  const [messageError, setMessageError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user.username || '',
      email: user.email || '',
      password: user.password || '',
      image: user.image || '',
    },
  });
  const onSubmit = (data) => {
    dispatch(UpdateUserProfileAccount(data))
      .unwrap()
      .then(() => {
        setMessageError({});
        reset();
        navigate('/');
      })
      .catch((error) => {
        setMessageError(JSON.parse(error.message));
      });
  };

  useEffect(() => {
    if (errors?.email || errors?.password || errors?.username) {
      setMessageError({});
    }
  }, [errors?.email, errors?.password, errors?.username]);

  return (
    <div className={styles['container']}>
      <div className={styles['container__title']}>
        <span>Edit Profile</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['container__create-form']} action="">
        <div>
          <span>Username</span>
          <input
            {...register('username', {
              required: { value: true, message: 'поле обязально для заполнения' },
              minLength: { value: 3, message: 'не менее 3 символов' },
              maxLength: { value: 20, message: 'не более 20 символов' },
            })}
            type="text"
          />
          <div className={styles.error}>
            <span>{errors && errors?.username?.message}</span>
          </div>
          {messageError.errors?.username && !errors?.username ? (
            <div className={`${styles['error-right']} ${styles.error}`}>
              <span>{messageError.errors.username}</span>
            </div>
          ) : null}
        </div>
        <div>
          <span>Email address</span>
          <input
            {...register('email', {
              required: { value: true, message: 'поле обязально для заполнения' },

              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: 'не корректный email',
              },
            })}
            type="text"
          />
          <div className={styles.error}>
            <span>{errors && errors?.email?.message}</span>
          </div>
          {messageError.errors?.email && !errors?.email ? (
            <div className={`${styles['error-right']} ${styles.error}`}>
              <span>{messageError.errors.email}</span>
            </div>
          ) : null}
        </div>
        <div>
          <span>New password</span>
          <input
            {...register('password', {
              required: { value: true, message: 'поле обязально для заполнения' },
              minLength: { value: 6, message: 'не менее 6 символов' },
              maxLength: { value: 40, message: 'не более 40 символов' },
            })}
            type="password"
          />
          <div className={styles.error}>
            <span>{errors && errors?.password?.message}</span>
          </div>
        </div>
        <div>
          <span>Avatar image (url)</span>
          <input
            {...register('image', {
              pattern: {
                value: /(https?:\/\/.*\.(?:png|jpg))/,
                message: 'не корректная ссылка',
              },
            })}
            type="text"
          />
          <div className={styles.error}>
            <span>{errors && errors?.image?.message}</span>
          </div>
        </div>

        <div className={styles.error}>
          <span style={{ color: ' #f5222d' }}>{errors && errors?.checkbox?.message}</span>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export { Profile };
