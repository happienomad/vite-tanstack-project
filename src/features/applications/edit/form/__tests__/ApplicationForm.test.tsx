import { createMemoryHistory, createRootRouteWithContext, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { http, HttpResponse } from "msw";
import { API_HOST } from "~/api/fetch";
import { queryClient } from "~/api/queryClient";
import { server } from "~/global/tests/nodeServer";
import { RouterContext } from "~/global/types/router";
import { ApplicationForm } from "../ApplicationForm";
import { QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Applicant } from "~/global/types/application";
import { ToastProvider } from "~/global/providers/ToastProvider";
import { act } from "react";

interface SetupTestProps {
    overrides?: {
        applicant: Applicant
    }
}


const VALID_APPLICANT = {
    firstName: "James",
    lastName: "Cameron",
    email: "james@avatar.com",
    phone: "8888888888",
}


const DEFAULT_APPLICANT: Applicant = {
    phone: "",
    email: "",
    firstName: "",
    lastName: ""
}

const DEFAULT_APPLICATION_ID = "c2f82924-612c-4489-b6ad-188d2db447d1";

const generateApplicantDetails = (applicant?: Partial<Applicant>) => {
    return {
        ...DEFAULT_APPLICANT,
        ...applicant
    }
}

export async function waitForRenderingToFinish() {
    return act(() => Promise.resolve());
}

function setupTest({
    overrides
}: SetupTestProps = { overrides : { applicant : DEFAULT_APPLICANT}}) {
    
    server.use(
        http.put(`${API_HOST}/applications/${DEFAULT_APPLICATION_ID}`, () => {
            return HttpResponse.json({
                "id": DEFAULT_APPLICATION_ID,
                "type": "NEW",
                "createdAt": "2025-03-04",
                "productId": 12347,
                "applicants": [
                    overrides?.applicant
                ]
            })
        })
    )

    const root = createRootRouteWithContext<RouterContext>()();

    const applicationForm = createRoute({
        getParentRoute: () => root,
        path: "/",
        component: () => <ApplicationForm applicationId={DEFAULT_APPLICATION_ID} applicant={overrides?.applicant || DEFAULT_APPLICANT} />,
    });

    const router = createRouter({
        context: {
            queryClient
        },
        history: createMemoryHistory({
            initialEntries: ["/"]
        }),
        defaultPendingMinMs: 0,
        routeTree: root.addChildren([applicationForm]),
    })

    render(<RouterProvider<typeof router> router={router} />, {
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

function applicantFormPOM() {

    const user = userEvent.setup({
        delay: 0
    });
    
    const searchText = (text: string) => {
        return screen.findByText(text);
    };

    const getSubmitButton = () => screen.findByRole("button", {
        name: "Save"
    });

    const iSubmitTheApplicantForm = async () => {

        const submitButton = await getSubmitButton();
        if(submitButton) {
            await user.click(submitButton)
        } else {
            throw new Error("Cannot find submit button");
        }
    }

    const iCompleteTheFormWithData = async (applicant?: Partial<Applicant>) => {
        
        const firstName = screen.getByLabelText("First Name:");
        const lastName = screen.getByLabelText("Last Name:");
        const email = screen.getByLabelText("email address:");
        const phone = screen.getByLabelText("Phone number:");

        const applicantInfo = generateApplicantDetails(applicant);

        await user.type(firstName, applicantInfo.firstName|| '{tab}');
        await user.type(lastName, applicantInfo.lastName || '{tab}');
        await user.type(email, applicantInfo.email || '{tab}');
        await user.type(phone, applicantInfo.phone || '{tab}');
        await iSubmitTheApplicantForm();
    }

    return {
        searchText,
        getSubmitButton,
        iSubmitTheApplicantForm,
        iCompleteTheFormWithData
    }
}

/* Mocking navigation */

const navigateMock = vi.fn();

vi.mock("@tanstack/react-router", async () => {
    const actual = await vi.importActual("@tanstack/react-router");
    return {
        ...actual,
        useRouter: vi.fn(() => ({
            navigate: navigateMock
        }))
    }
});

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
        expect(navigateMock).not.toHaveBeenCalled();
    })

    it("Should submit the applicant details when all valid data is entered", async () => {
        setupTest();
        const { iCompleteTheFormWithData, iSubmitTheApplicantForm } = applicantFormPOM();
        await iSubmitTheApplicantForm();
        await iCompleteTheFormWithData(VALID_APPLICANT);
        expect(navigateMock).toHaveBeenCalledWith(expect.objectContaining({
            to: "/applications"
        }))
    });
})