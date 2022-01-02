import { loginFail, loginStart, loginSuccess, signupSuccess, signupFail, signupStart } from "./userRedux";
import { publicRequest } from "../requestsAPI";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/dangnhap", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFail());
  }
};
export const signup = async (dispatch, newUser) => {
  dispatch(signupStart());
  try {
    const res = await publicRequest.post("/auth/dangki", newUser);
    dispatch(signupSuccess(res.data));
  } catch (err) {
    dispatch(signupFail());
  }
};