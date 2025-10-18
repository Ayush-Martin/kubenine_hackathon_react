import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./features/slice/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";

const authPersistConfig = {
  key: "auth",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  other: {},
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
