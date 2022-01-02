
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    isSending: false,
    error: false,
    address: null,
    name: null,
    phone: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    signupStart: (state) => {
      state.isSending = true;
    },
    signupSuccess: (state, action) => {
      state.isSending = false;
      state.currentUser = action.payload;
    },
    signupFail: (state) => {
      state.isSending = false;
      state.error = true;
    },
    logout: (state) => {
    state.currentUser=null;
    state.isFetching=false;
    state.isSending=false;
    state.error=false;
    state.address=null;
    state.name=null;
    state.phone=null;
    },
    addInfo: (state, actions) => {
      state.address = actions.payload.address;
      state.name = actions.payload.name;
      state.phone= actions.payload.phone;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  signupStart,
  signupSuccess,
  signupFail,
  logout,
  addInfo,
} = userSlice.actions;
export default userSlice.reducer;
