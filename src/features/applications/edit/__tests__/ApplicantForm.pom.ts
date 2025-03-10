import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { generateApplicantDetails } from "./applicantMock";
import { Applicant } from "~/global/types/application";

/**
 * Test POM
 */

export function applicantFormPOM() {

    const user = userEvent.setup({
        delay: 0
    });
    
    const searchText = (text: string) => {
        return screen.findByText(text);
    };

    const getSubmitButton = () => screen.findByRole("button", {
        name: "Save"
    });

    const getInputField = (label: string) => screen.findByLabelText(label);

    const iSubmitTheApplicantForm = async () => {

        const submitButton = await getSubmitButton();
        if(submitButton) {
            await user.click(submitButton)
        } else {
            throw new Error("Cannot find submit button");
        }
    }

    const iCompleteTheFormWithData = async (applicant?: Partial<Applicant>) => {
        
        const firstName = await getInputField("First Name:");
        const lastName = await getInputField("Last Name:");
        const email = await getInputField("email address:");
        const phone = await getInputField("Phone number:");

        const applicantInfo = generateApplicantDetails(applicant);

        await user.type(firstName, applicantInfo.firstName|| '{tab}');
        await user.type(lastName, applicantInfo.lastName || '{tab}');
        await user.type(email, applicantInfo.email || '{tab}');
        await user.type(phone, applicantInfo.phone || '{tab}');
        await iSubmitTheApplicantForm();
    }

    return {
        getInputField,
        searchText,
        getSubmitButton,
        iSubmitTheApplicantForm,
        iCompleteTheFormWithData
    }
}