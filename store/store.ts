// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; 

import { combineReducers } from "redux";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth slice
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with middleware fix for redux-persist
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Fix non-serializable action warning from redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
