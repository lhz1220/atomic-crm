import { mergeTranslations } from "ra-core";
import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import frenchMessages from "ra-language-french";
import { raSupabaseEnglishMessages } from "ra-supabase-language-english";
import { raSupabaseFrenchMessages } from "ra-supabase-language-french";
import { englishCrmMessages } from "./englishCrmMessages";
import { frenchCrmMessages } from "./frenchCrmMessages";
import { traditionalChineseConfigurationMessages } from "./traditionalChineseConfigurationMessages";
import { traditionalChineseCrmMessages } from "./traditionalChineseCrmMessages";
import { traditionalChineseRaMessages } from "./traditionalChineseRaMessages";

const raSupabaseEnglishMessagesOverride = {
  "ra-supabase": {
    auth: {
      password_reset: "Check your emails for a Reset Password message.",
    },
    oauth: {
      authorize: "Authorize Application",
      authorize_details: "This application wants to access your account.",
      access_scope:
        "It will be able to read and modify your data, with the same permissions as your account.",
      approved: "Authorization Approved",
      close_tab: "You can now close this tab.",
      no_request: "No authorization request found",
    },
  },
};

const raSupabaseFrenchMessagesOverride = {
  "ra-supabase": {
    auth: {
      password_reset:
        "Consultez vos emails pour trouver le message de reinitialisation du mot de passe.",
    },
    oauth: {
      authorize: "Autoriser l'application",
      authorize_details: "Cette application souhaite accéder à votre compte.",
      access_scope:
        "Elle pourra lire et modifier vos données, avec les mêmes droits que votre compte.",
      approved: "Autorisation accordée",
      close_tab: "Vous pouvez fermer cet onglet.",
      no_request: "Aucune demande d'autorisation trouvée",
    },
  },
};

const englishCatalog = mergeTranslations(
  englishMessages,
  raSupabaseEnglishMessages,
  raSupabaseEnglishMessagesOverride,
  englishCrmMessages,
);

const frenchCatalog = mergeTranslations(
  englishCatalog,
  frenchMessages,
  raSupabaseFrenchMessages,
  raSupabaseFrenchMessagesOverride,
  frenchCrmMessages,
);

const traditionalChineseCatalog = mergeTranslations(
  englishCatalog,
  traditionalChineseRaMessages,
  traditionalChineseCrmMessages,
  traditionalChineseConfigurationMessages,
);

export type SupportedLocale = "zh-TW" | "en" | "fr";

// The app defaults to Traditional Chinese regardless of the browser language;
// users can still switch to English or French from the locale menu.
export const DEFAULT_LOCALE: SupportedLocale = "zh-TW";

const catalogs: Record<SupportedLocale, typeof englishCatalog> = {
  "zh-TW": traditionalChineseCatalog,
  en: englishCatalog,
  fr: frenchCatalog,
};

const isSupportedLocale = (locale: string): locale is SupportedLocale =>
  Object.hasOwn(catalogs, locale);

export const i18nProvider = polyglotI18nProvider(
  (locale) =>
    isSupportedLocale(locale) ? catalogs[locale] : catalogs[DEFAULT_LOCALE],
  DEFAULT_LOCALE,
  [
    { locale: "zh-TW", name: "繁體中文" },
    { locale: "en", name: "English" },
    { locale: "fr", name: "Français" },
  ],
  { allowMissing: true },
);

export const testI18nProvider = polyglotI18nProvider(
  () => englishCatalog,
  "en",
  [{ locale: "en", name: "English" }],
  { allowMissing: true },
);
