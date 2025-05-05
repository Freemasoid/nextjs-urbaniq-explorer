import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Language = "enUS" | "deDE" | "ruRU";

export interface LanguageState {
  language: Language;
}

const getInitialState = (): Language => {
  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem(
      "ui-language"
    ) as Language | null;
    return storedLanguage || "enUS";
  }
  return "enUS";
};

const initialState: LanguageState = {
  language: getInitialState(),
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("ui-language", action.payload);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
