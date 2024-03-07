import etaReducer from "./features/eta";
import searchDialogReducer from "./features/searchDialog";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

export const makeStore = () => {
  const createNoopStorage = () => {
    return {
      getItem(_key: string) {
        return Promise.resolve(null);
      },
      setItem(_key: string, value: string) {
        return Promise.resolve(value);
      },
      removeItem(_key: string) {
        return Promise.resolve();
      },
    };
  };

  const storage =
    typeof window !== "undefined"
      ? createWebStorage("local")
      : createNoopStorage();
  const persistConfig = {
    key: "root",
    storage,
    whitelist: ["etas"],
  };

  const rootReducer = combineReducers({
    etas: etaReducer,
    searchDialog: searchDialogReducer,
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["store"]["getState"]>;
export type AppDispatch = AppStore["store"]["dispatch"];
