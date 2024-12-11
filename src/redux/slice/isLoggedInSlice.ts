import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthStaet {
  isLoggedIn: boolean;
  access: string | null;
}

const initialState: AuthStaet = {
  isLoggedIn: false,
  access: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.access = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.access = null;
    },
    setIsLoginStatus: (state, action: PayloadAction<{ isLoggedIn: boolean; access: string | null }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.access = action.payload.access;
    },
  },
});

export const { login, logout, setIsLoginStatus } = authSlice.actions;

export default authSlice.reducer;
