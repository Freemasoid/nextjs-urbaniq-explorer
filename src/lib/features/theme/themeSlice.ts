import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark" | "system";

export interface ThemeState {
  theme: Theme;
}

const getInitialState = (): Theme => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("ui-theme") as Theme | null;
    return storedTheme || "system";
  }
  return "system";
};

const initialState: ThemeState = {
  theme: getInitialState(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("ui-theme", action.payload);
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
