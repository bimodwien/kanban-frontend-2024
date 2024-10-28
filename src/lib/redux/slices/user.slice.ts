import { TUser } from "@/models/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie } from "cookies-next";

const initialUser = {
  id: "",
  username: "",
  email: "",
  fullName: "",
  password: "",
};

export const userSlice = createSlice({
  name: "auth",
  initialState: initialUser as TUser,
  reducers: {
    login: (state, action: PayloadAction<TUser>) => {
      console.log("payload", action.payload);

      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.password = action.payload.password;
      return state;
    },
    logout: (state) => {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      state.id = initialUser.id;
      state.username = initialUser.username;
      state.email = initialUser.email;
      state.fullName = initialUser.fullName;
      state.password = initialUser.password;
      return state;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
