import { createSlice } from '@reduxjs/toolkit';
import { ILogin } from './type';

const initialState: ILogin = {
  loading: false,
  error: '',
  data: null
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    }
  }
});

export const { loginRequest } = loginSlice.actions;

export default loginSlice.reducer;
