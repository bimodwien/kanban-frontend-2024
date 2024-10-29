import { Dispatch } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios";
import { login, logout } from "../slices/user.slice";
import { TUser } from "@/models/user.model";
import { deleteCookie } from "cookies-next";

export const userLogin = ({ username, password }: TUser) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance().post(
        "/users/login",
        { username, password },
        { withCredentials: true }
      );
      const user: TUser = response.data.user;
      if (user) {
        dispatch(login(user));
      } else {
        throw new Error("Can't get access token");
      }
    } catch (error) {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      throw error;
    }
  };
};

export function keepLogin() {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance().get("/users/keep-login");
      const user: TUser = response.data.user;
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      dispatch(logout());
      throw error;
    }
  };
}
