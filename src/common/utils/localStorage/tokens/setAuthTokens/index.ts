import Cookies from 'js-cookie';

import { Tokens } from '@common/api/services/auth/types/user.type';

const setAuthTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(Tokens.AccessToken, accessToken);
  Cookies.set(Tokens.RefreshToken, refreshToken);
};

export default setAuthTokens;
