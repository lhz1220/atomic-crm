import { afterEach, describe, expect, it } from "vitest";
import { DEFAULT_LOCALE, i18nProvider } from "./i18nProvider";

afterEach(async () => {
  await i18nProvider.changeLocale(DEFAULT_LOCALE);
});

describe("i18nProvider", () => {
  it("registers zh-TW, en and fr locales", () => {
    expect(i18nProvider.getLocales?.()).toEqual([
      { locale: "zh-TW", name: "繁體中文" },
      { locale: "en", name: "English" },
      { locale: "fr", name: "Français" },
    ]);
  });

  it("defaults to traditional chinese", () => {
    expect(i18nProvider.getLocale()).toBe("zh-TW");
    expect(i18nProvider.translate("crm.language")).toBe("語言");
  });

  it("translates ra-core and ra-supabase keys in traditional chinese", () => {
    expect(i18nProvider.translate("ra.action.save")).toBe("儲存");
    expect(i18nProvider.translate("ra-supabase.auth.forgot_password")).toBe(
      "忘記密碼？",
    );
  });

  it("translates the language key in french", async () => {
    await i18nProvider.changeLocale("fr");

    expect(i18nProvider.translate("crm.language")).toBe("Langue");
  });

  it("falls back to traditional chinese for unknown locales", async () => {
    await i18nProvider.changeLocale("es");

    expect(i18nProvider.translate("crm.language")).toBe("語言");
  });

  it("does not treat object prototype keys as locales", async () => {
    await i18nProvider.changeLocale("toString");

    expect(i18nProvider.translate("crm.language")).toBe("語言");
  });

  it("uses customized password reset overrides for en and fr", async () => {
    await i18nProvider.changeLocale("en");
    expect(i18nProvider.translate("ra-supabase.auth.password_reset")).toBe(
      "Check your emails for a Reset Password message.",
    );

    await i18nProvider.changeLocale("fr");
    expect(i18nProvider.translate("ra-supabase.auth.password_reset")).toBe(
      "Consultez vos emails pour trouver le message de reinitialisation du mot de passe.",
    );
  });

  it("translates recently added fr crm keys", async () => {
    await i18nProvider.changeLocale("fr");

    expect(i18nProvider.translate("resources.deals.empty.title")).toBe(
      "Aucune affaire trouvée",
    );
  });
});
