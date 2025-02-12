"use client";

import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "@/libs/types";

const initialState: AuthState = {
  user: null,
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
