/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { i18n } from "@lingui/core";

const LOCALES = {
    EnglishUS: "en-US",
    EnglishCA: "en-CA",
    FrenchCA: "fr-CA"
}

export type SupportedLocales = (typeof LOCALES)[keyof typeof LOCALES];

export const DEFAULT_LOCALE: SupportedLocales = LOCALES.EnglishCA;

export const localeMessages = {
    [LOCALES.EnglishCA]: import(`./locales/${LOCALES.EnglishCA}.po`)
} as const;

export async function dynamicActivate(locale: SupportedLocales) {
    const { messages } = await localeMessages[locale];

    i18n.loadAndActivate({ locale, messages });

}