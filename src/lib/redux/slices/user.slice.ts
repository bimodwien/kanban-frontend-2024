import { TUser } from "@/models/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState extends TUser {
  isLoaded: boolean;
}

const initialUser: AuthState = {
  id: "",
  username: "",
  email: "",
  fullName: "",
  isLoaded: false,
};

export const userSlice = createSlice({
  name: "auth",
  initialState: initialUser,
  reducers: {
    login: (state, action: PayloadAction<TUser>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.isLoaded = true;
      return state;
    },
    logout: (state) => {
      state.id = initialUser.id;
      state.username = initialUser.username;
      state.email = initialUser.email;
      state.fullName = initialUser.fullName;
      state.isLoaded = true;
      return state;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
