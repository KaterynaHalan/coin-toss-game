import { LOGIN, LOGOUT, SET_TOKENS, CLEAR_TOKENS } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data: { token, tokens } } = await api.signUp(formData);
    dispatch({ type: LOGIN, token });
    dispatch({ type: SET_TOKENS, tokens });
    history("/");
    messages.success("Login Successful");
  } catch (error) {
    messages.error(error.response?.data?.message || "Something went wrong");
  }
};

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data: { token, tokens } }= await api.login(formData);
    dispatch({ type: LOGIN, token });
    dispatch({ type: SET_TOKENS, tokens });
    history("/");
    messages.success("Login Successful");
  } catch (error) {
    messages.error(error.response?.data?.message || "Something went wrong");
  }
};

export const changePassword = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(formData);
    dispatch({ type: LOGOUT, data });
    dispatch({ type: CLEAR_TOKENS });
    messages.success("Password Change Was Successful");
    history("/");
  } catch (error) {
    messages.error(error.response?.data?.message || "Something went wrong");
  }
};