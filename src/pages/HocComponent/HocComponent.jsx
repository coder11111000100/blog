import { useLocation, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HocComponent({ children }) {
  const { slug } = useParams();
  const user = useSelector((state) => state.user.user);
  const articles = useSelector((state) => state.article.articles);
  const location = useLocation();

  if (slug && user) {
    const elem = articles.find((item) => item.slug === slug);
    if (user.user.username === elem.author.username) {
      return children;
    }
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
}

export { HocComponent };
