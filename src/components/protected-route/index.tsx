import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../services/store';

export const ProtectedRoute = ({
  reverse = false,
  children
}: {
  reverse?: boolean;
  children: React.ReactElement;
}) => {
  const location = useLocation();
  const { user, isInit, isLoading } = useSelector(
    (store: RootState) => store.user
  );
  if (!isInit || isLoading) {
    return <Preloader />;
  }
  if (!user && !reverse) {
    return <Navigate replace to='/login' state={{ afterLogin: location }} />;
  }
  if (user && reverse) {
    return (
      <Navigate replace to={location.state?.afterLogin?.pathname || '/'} />
    );
  }
  return children;
};
