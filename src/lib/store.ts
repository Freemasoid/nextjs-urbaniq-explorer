import { configureStore } from "@reduxjs/toolkit";
import { themeReducer, userReducer } from "@/lib/features/index";
import languageReducer from "@/lib/features/language/languageSlice";
import type { ThemeState } from "@/lib/features//theme/themeSlice";
import type { UserState } from "@/lib/features/user/userSlice";
import type { LanguageState } from "@/lib/features/language/languageSlice";

export const store = configureStore({
  reducer: {
    themeState: themeReducer,
    userState: userReducer,
    languageState: languageReducer,
  },
});

export type RootState = {
  themeState: ThemeState;
  userState: UserState;
  languageState: LanguageState;
};

export type AppDispatch = typeof store.dispatch;

export type ReduxStore = {
  getState: () => RootState;
  dispatch: AppDispatch;
};
