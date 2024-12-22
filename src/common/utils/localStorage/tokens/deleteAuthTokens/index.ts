import Cookies from 'js-cookie';

import { Tokens } from '@common/api/services/auth/types/user.type';

const deleteAuthTokens = () => {
  Cookies.remove(Tokens.AccessToken);
  Cookies.remove(Tokens.RefreshToken);
};

export default deleteAuthTokens;
