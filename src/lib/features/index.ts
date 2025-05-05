/* Actions */
import { setLanguage } from "./language/languageSlice";
import { setTheme } from "./theme/themeSlice";

export { setLanguage, setTheme };

/* Reducers */
import themeReducer from "./theme/themeSlice";
import languageReducer from "./language/languageSlice";
import userReducer from "./user/userSlice";

export { themeReducer, languageReducer, userReducer };

/* Types */
import type { Language } from "./language/languageSlice";
import type { Theme } from "./theme/themeSlice";

export { Language, Theme };
