/**
 * Mock Data
 */

import { Applicant } from "~/global/types/application"

export const VALID_APPLICANT = {
    firstName: "James",
    lastName: "Cameron",
    email: "james@avatar.com",
    phone: "8888888888",
}


export const DEFAULT_APPLICANT: Applicant = {
    phone: "",
    email: "",
    firstName: "",
    lastName: ""
}

export const generateApplicantDetails = (applicant?: Partial<Applicant>) => {
    return {
        ...DEFAULT_APPLICANT,
        ...applicant
    }
}