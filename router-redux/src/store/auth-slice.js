import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      console.log(action.payload);
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.token = "";
      state.isLoggedIn = false;
    },
    getToken(state) {
      state.token = localStorage.getItem("token");

      if (state.token !== "") {
        state.isLoggedIn = true;
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
