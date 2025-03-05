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

interface SetupTestProps {
    overrides?: {
        applicant: Applicant
    }
}


const testApplicant = (applicant?: Partial<Applicant>) => {
    return {
        firstName: "James",
        lastName: "Cameron",
        email: "james@avatar.com",
        phone: "8888888888",
        ...applicant
    }
}

const DEFAULT_APPLICANT: Applicant = {
    phone: "",
    email: "",
    firstName: "",
    lastName: ""
}

const DEFAULT_APPLICATION_ID = "c2f82924-612c-4489-b6ad-188d2db447d1"

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
                <I18nProvider i18n={i18n}>
                    {children}
                </I18nProvider>
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

    const iSubmitTheApplicantForm = async () => {
        const submitButton = await screen.findByRole("button", {
            name: "Save"
        });
        if(submitButton) {
            await user.click(submitButton);
        } else {
            throw new Error("Cannot find submit button");
        }
    }

    const iCompleteTheFormWithData = async (applicant?: Partial<Applicant>) => {
        const firstName = screen.getByLabelText("First Name:");
        const lastName = screen.getByLabelText("Last Name:");
        const email = screen.getByLabelText("email address:");
        const phone = screen.getByLabelText("Phone number:");

        const applicantInfo = testApplicant(applicant);

        await user.type(firstName, applicantInfo.firstName);
        await user.tab();
        await user.type(lastName, applicantInfo.lastName);
        await user.tab();
        await user.type(email, applicantInfo.email);
        await user.tab();
        await user.type(phone, applicantInfo.phone);
        await iSubmitTheApplicantForm();
    }

    return {
        searchText,
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
    });

    it("Should throw validation errors when form fields are empty", async () => {
        setupTest();
        const { iSubmitTheApplicantForm, searchText } = applicantFormPOM();
        await iSubmitTheApplicantForm();
        
        expect(await searchText("Please enter a valid email")).toBeVisible();
        expect(await searchText("Please enter your phone number")).toBeVisible();
    });

    it("Should not submit the applicant details when an invalid phone number is entered", async () => {
        setupTest();
        const { searchText, iCompleteTheFormWithData } = applicantFormPOM();
        await iCompleteTheFormWithData({
            phone: "12334"
        });
        expect(await searchText("Phone Number must be at least 10 characters")).toBeVisible();
    });

    it("Should submit the applicant details when all valid data is entered", async () => {
        setupTest();
        const { iCompleteTheFormWithData } = applicantFormPOM();
        await iCompleteTheFormWithData();
        expect(navigateMock).toHaveBeenCalledWith(expect.objectContaining({
            to: "/applications"
        }))
    });
})