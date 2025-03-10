import { queryClient } from "~/api/queryClient";
import { ApplicantForm } from "../form/ApplicantForm";
import { QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { render, screen } from "@testing-library/react";
import { Applicant } from "~/global/types/application";
import { ToastProvider } from "~/global/providers/ToastProvider";
import { DEFAULT_APPLICANT, VALID_APPLICANT } from "./applicantMock";
import { applicantFormPOM } from "./ApplicantForm.pom";


interface SetupTestProps {
    applicant?: Applicant
}

/**
 * 
 * Test setup
 */

/* Mocking onSubmit event handler */

const onSubmit = vi.fn();


function setupTest({
    applicant
}: SetupTestProps = { applicant : DEFAULT_APPLICANT}) {

    render(<ApplicantForm applicant={applicant || DEFAULT_APPLICANT} onSubmit={onSubmit} />, {
        wrapper: ({ children }) => (
            <QueryClientProvider client={queryClient}>
                <ToastProvider>
                    <I18nProvider i18n={i18n}>
                        {children}
                    </I18nProvider>
                </ToastProvider>
            </QueryClientProvider>
        )
    })
}


/**
 * Tests
 */

describe("Should render the application form", () => {

    afterAll(() => {
        vi.clearAllMocks();
    });

    it("Should render the form", async () => {
        setupTest();
        expect(await screen.findByText("Main Applicant Information")).toBeInTheDocument();
        expect(await screen.findByText("First Name:")).toBeInTheDocument();
        const { getSubmitButton } = applicantFormPOM();
        expect(await getSubmitButton()).toBeDisabled();
    });

    it("Should not submit the applicant details when an invalid email is entered", async () => {
        setupTest();
        const { searchText, iCompleteTheFormWithData } = applicantFormPOM();
        await iCompleteTheFormWithData({
            email: "abcd"
        });
        expect(await searchText("Please enter a valid email address")).toBeVisible();
    });

    it("Should not submit the applicant details when an invalid phone number is entered", async () => {
        setupTest();
        const { searchText, iCompleteTheFormWithData } = applicantFormPOM();
        await iCompleteTheFormWithData({
            phone: "3123123"
        });
        expect(await searchText("Phone Number must be exactly 10 digits")).toBeVisible();
        expect(onSubmit).not.toHaveBeenCalled();
    })

    it("Should invoke onSubmit event handler when the valid data is entered", async () => {
        setupTest();
        const { iCompleteTheFormWithData, iSubmitTheApplicantForm } = applicantFormPOM();
        await iSubmitTheApplicantForm();
        await iCompleteTheFormWithData(VALID_APPLICANT);
        expect(onSubmit).toHaveBeenCalled();
    });

    it("Should prefill the form if applicant details are passed as prop", async () => {
        setupTest({
            applicant: VALID_APPLICANT
        });
        const { getInputField, getSubmitButton } = applicantFormPOM();
        const firstNameField = await getInputField("First Name:");
        expect(firstNameField).toHaveValue(VALID_APPLICANT.firstName);
        expect(await getSubmitButton()).toBeEnabled();
    })
})