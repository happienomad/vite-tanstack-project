import { z } from "zod";
import { i18n } from "@lingui/core";
import { t } from "@lingui/core/macro";
import { DEFAULT_LOCALE } from "~/i18n/i18n";

// Ensure the locale is set before using translation functions
i18n.activate(i18n.locale || DEFAULT_LOCALE); // Replace "en" with the appropriate locale
export const ApplicantSchema = z.object({
    phone: z.string().nonempty({
        message: t`Please enter your phone number`
    }).min(10, {
        message: t`Phone Number must be at least 10 characters`
    }).max(14, {
        message: t`Phone number cannot be more than 14 characters`
    }).refine((val) => /^[0-9]+$/.test(val), {
        message: t`Phone number should contain only digits`
    }),
    email: z.string().email({
        message: t`Please enter a valid email`
    }).nonempty({
        message: t`email address is required`,
    }),
    firstName: z.string().nonempty({
        message: t`Please enter your first name`
    }),
    lastName: z.string().nonempty({
        message: t`Please enter your last name`
    })
});

export type Applicant = z.infer<typeof ApplicantSchema>;

export type Application = {
    readonly id: string;
    token: string;
    type: "NEW" | "RENEWAL" | "REFINANCE";
    applicants: Applicant[];
    productId?: number;
    readonly createdAt: string;
};

export type CreateApplication = {
    productId: number;
};