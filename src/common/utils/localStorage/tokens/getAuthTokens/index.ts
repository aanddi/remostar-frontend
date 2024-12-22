import Cookies from 'js-cookie';

import { Tokens } from '@common/api/services/auth/types/user.type';

const getAuthTokens = () => {
  const accessToken = Cookies.get(Tokens.AccessToken);
  const refreshToken = Cookies.get(Tokens.RefreshToken);

  return { accessToken, refreshToken };
};

export default getAuthTokens;
