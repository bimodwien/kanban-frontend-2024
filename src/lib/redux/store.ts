import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user.slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "./storage";

const reducer = combineReducers({
  auth: userSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const store = makeStore();
export const persistor = persistStore(store);
