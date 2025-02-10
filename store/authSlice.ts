import { AuthState } from "@/libs/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null, // Start with null to avoid SSR mismatch
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = {
        isAuthenticated: true,
        role: action.payload,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    logoutSuccess: (state) => {
      state.user = {
        isAuthenticated: false,
        role: "",
      };
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, setUser } = authSlice.actions;
export default authSlice.reducer;
