import { useAppSelector } from '@common/hooks';
import { getAuthTokens } from '@common/utils';

export const useAuth = () => {
  const user = useAppSelector((state) => state.user);

  const { accessToken, refreshToken } = getAuthTokens();

  const isAuthorized = !!accessToken && !!refreshToken;

  return {
    user: user.user,
    isAuthorized,
  };
};

export default useAuth;
