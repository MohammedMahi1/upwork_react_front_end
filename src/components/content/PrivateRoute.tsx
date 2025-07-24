
import { useAppSelector } from '@/hooks/storeHooks';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
const PrivateRoute = () => {
  const {isAuth} = useAppSelector((state: RootState) => state.auth);
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
