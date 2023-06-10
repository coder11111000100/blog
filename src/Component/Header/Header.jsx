import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from '../../store/UserReducer';
import img from '../../assets/Rectangle 1.png';
import styles from './Header.module.scss';

function Header() {
  const user = useSelector((state) => state.user.user);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate({ pathname: '/' });
  };

  const logOut = () => {
    dispath(logOutUser());
    navigate({ pathname: '/' });
  };
  // console.log(user, user.image);
  return (
    <header className={styles['container-header']}>
      <div aria-hidden="true" onClick={goToHome} className={styles['container-header__title']}>
        <h1>Realworld Blog</h1>
      </div>
      {user ? (
        <ul className={styles['container-header__profile']}>
          <li>
            <NavLink to="/new-article">Create article</NavLink>
            <NavLink to="/profile">
              <span> {user?.user?.username}</span>
              <img src={user?.user.image || img} alt="logo" />
            </NavLink>
          </li>
        </ul>
      ) : null}
      {!user ? (
        <ul className={styles['container-header__list']}>
          <li>
            <NavLink to="/sign-in">Sign In</NavLink>
          </li>
          <li>
            <NavLink to="/sign-up">Sign Up</NavLink>
          </li>
        </ul>
      ) : null}

      {user ? (
        <ul className={styles['container-header__logOut']}>
          <li>
            <button type="button" onClick={logOut}>
              Log Out
            </button>
          </li>
        </ul>
      ) : null}
    </header>
  );
}

export { Header };
