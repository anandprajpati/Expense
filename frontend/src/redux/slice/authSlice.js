import { createSlice } from "@reduxjs/toolkit";

// Load userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userInfoFromStorage, 
  },
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
      
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutAction: (state) => {
      state.user = null;
      
      localStorage.removeItem("userInfo");
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
