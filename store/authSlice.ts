
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from '../lib/types/index';



const initialState: AuthState = {
  isAuthenticated: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<{ role: string }>) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
    },
    logoutAction: (state) => {
      state.isAuthenticated = false;
      state.role = null;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;
