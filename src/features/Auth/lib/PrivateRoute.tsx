import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { UserDataAtom } from '@entities/User';

type PrivateRouteType = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteType) => {
  const userData = useRecoilValue(UserDataAtom);
  const location = useLocation();

  if (!userData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
