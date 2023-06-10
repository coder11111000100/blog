/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { Divider, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { createAccount } from '../../store/UserReducer';
import styles from './CreateAccount.module.scss';

function CreateAccount() {
  const [messageError, setMessageError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createAccount(data))
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
        <span>Create new account</span>
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
              <span>{messageError?.errors?.username}</span>
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
              <span>{messageError?.errors?.email}</span>
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
        </div>
        <div>
          <span>Repeat Password</span>
          <input
            {...register('repeat_password', {
              required: { value: true, message: 'поле обязально для заполнения' },
              validate: (value) => {
                return value === watch('password') ? true : 'пароли должны совпадать';
              },
            })}
            type="password"
          />
          <div className={styles.error}>
            <span>{errors && errors?.repeat_password?.message}</span>
          </div>
        </div>
        <Divider style={{ margin: 0 }} />
        <Controller
          render={({ field }) => {
            const { value, ...arg } = field;
            return (
              <Checkbox {...arg} checked={value} ref={field.ref} onChange={field.onChange}>
                I agree to the processing of my personal information
              </Checkbox>
            );
          }}
          name="checkbox"
          control={control}
          rules={{ required: { value: true, message: 'нужно согласие' } }}
          defaultValue={false}
        />
        <div className={styles.error}>
          <span style={{ color: ' #f5222d' }}>{errors && errors?.checkbox?.message}</span>
        </div>
        <button type="submit">Create</button>
        <span>
          Already have an account?
          <NavLink to="/sign-in" style={{ textDecoration: 'none' }}>
            Sign In.
          </NavLink>
        </span>
      </form>
    </div>
  );
}

export { CreateAccount };
