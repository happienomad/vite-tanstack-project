import { LinguiConfig } from "@lingui/conf";

const config: LinguiConfig = {
    catalogs: [
        {
            include: ["src"],
            path: "<rootDir>/src/internationalization/locales/{locale}",
        }
    ],
    locales: ["en-CA", "fr-CA"],
    sourceLocale: "en-CA",
}

export default config;