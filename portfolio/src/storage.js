const STORAGE_KEY = "portfolio-language";

/**
 * Browser storage is optional. Some privacy settings and embedded contexts
 * deny localStorage and throw SecurityError when it is accessed.
 * The portfolio must still render with English as the default.
 */
export function readStoredLanguage(getStorage = () => window.localStorage) {
  try {
    return getStorage().getItem(STORAGE_KEY) === "vi" ? "vi" : "en";
  } catch {
    return "en";
  }
}

/**
 * Persist the language preference when storage is available.
 * A failed write must not interrupt rendering or language switching.
 */
export function writeStoredLanguage(language, getStorage = () => window.localStorage) {
  try {
    getStorage().setItem(STORAGE_KEY, language === "vi" ? "vi" : "en");
    return true;
  } catch {
    return false;
  }
}
