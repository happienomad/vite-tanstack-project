import { t } from "@lingui/core/macro";
import { z } from "zod";

export const ApplicantSchema = z.object({
    phone: z.string().nonempty({
        message: t`Please enter your phone number`
    }).min(10).max(14).refine((val) => /^[0-9]+$/.test(val), {
        message: t`Phone number should contain only digits`
    }),
    email: z.string().email({
        message: t`Please enter a valid email`
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