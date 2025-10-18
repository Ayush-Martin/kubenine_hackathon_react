import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
  authToken: string | null;
}

const initialState: AuthState = {
  userId: null,
  authToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userId = action.payload.userId;
      state.authToken = action.payload.authToken;
    },
    clearCredentials: (state) => {
      state.userId = null;
      state.authToken = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
