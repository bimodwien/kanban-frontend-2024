import { Dispatch } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios";
import { login } from "../slices/user.slice";
import { TUser } from "@/models/user.model";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export const userLogin = ({ username, password }: TUser) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance().post(
        "/users/login",
        { username, password },
        { withCredentials: true }
      );
      const user: TUser = response.data.user;
      console.log(user);

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
  return async function dispatch(dispatch: Dispatch) {
    try {
      const token = getCookie("access_token") || "";
      const decode = jwtDecode(token!) as { user: TUser };
      if (token) {
        dispatch(login(decode?.user));
      }
    } catch (error) {
      console.log(error);
      deleteCookie("access_token");
    }
  };
}
