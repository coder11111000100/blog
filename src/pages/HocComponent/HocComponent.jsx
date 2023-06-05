import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HocComponent({ children }) {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  return children;
}

export { HocComponent };
