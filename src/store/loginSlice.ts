import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SliceState {
  isLoggedIn: boolean;
  userName: string;
}

const initialState = {
  isLoggedIn: false,
  userName: "",
} as SliceState;
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loggedIn(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.userName = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export default loginSlice;
export const { loggedIn, logout } = loginSlice.actions;
