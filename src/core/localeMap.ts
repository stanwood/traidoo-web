import { Locale } from "date-fns";
import deLocale from "date-fns/locale/de";
import enLocale from "date-fns/locale/en-US";

const localeMap: Record<string, Locale> = {
  en: enLocale,
  de: deLocale,
};

export default localeMap;
