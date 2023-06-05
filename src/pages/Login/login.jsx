/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signInAccount } from '../../store/UserReducer';
import styles from './Login.module.scss';

function Login() {
  const [messageError, setMessageError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(signInAccount(data))
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

  return (
    <div className={styles['container']}>
      <div className={styles['container__title']}>
        <span>Sign In</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['container__create-form']} action="">
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
          {messageError?.errors !== undefined ? (
            <div className={`${styles['error-right']} ${styles.error}`}>
              <span>{messageError.errors['email or password']}</span>
            </div>
          ) : null}
        </div>
        <div>
          <span>Password</span>
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
          {messageError?.errors !== undefined ? (
            <div className={`${styles['error-right']} ${styles.error}`}>
              <span>email or password: is invalid!!!</span>
            </div>
          ) : null}
        </div>

        <button type="submit">Create</button>
        <span>
          Don’t have an account?{' '}
          <NavLink to="/sign-up" style={{ textDecoration: 'none' }}>
            Sign Up.
          </NavLink>
        </span>
      </form>
    </div>
  );
}

export { Login };
