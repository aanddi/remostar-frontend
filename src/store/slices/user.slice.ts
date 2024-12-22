import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { Tokens } from '@common/api/services/auth/types/user.type';
import { IUserProfile } from '@common/api/services/user';
import { deleteAuthTokens } from '@common/utils';

export interface IInitialState {
  user: IUserProfile | null;
  isAuthorized: boolean;
}

const initialState: IInitialState = {
  user: null,
  isAuthorized: !!Cookies.get(Tokens.AccessToken) && !!Cookies.get(Tokens.RefreshToken),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authorized: (_state, action: PayloadAction<boolean>) => {
      return {
        ..._state,
        isAuthorized: action.payload,
      };
    },

    loginUser: (_state, action: PayloadAction<IUserProfile>) => {
      return {
        ..._state,
        user: action.payload,
      };
    },

    logoutUser: () => {
      deleteAuthTokens();
      localStorage.removeItem('userProfile');
      return {
        ...initialState,
      };
    },
  },
});

export const { loginUser, logoutUser, authorized } = userSlice.actions;

export default userSlice.reducer;
