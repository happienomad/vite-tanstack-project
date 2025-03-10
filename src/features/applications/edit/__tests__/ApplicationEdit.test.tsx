/* eslint-disable @typescript-eslint/no-explicit-any */
import { I18nProvider } from "@lingui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createMemoryHistory, createRootRouteWithContext, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { queryClient } from "~/api/queryClient";
import { ToastProvider } from "~/global/providers/ToastProvider";
import { ApplicationEdit } from "../ApplicationEdit";
import { RouterContext } from "~/global/types/router";
import { server } from "~/global/tests/nodeServer";
import { http, HttpResponse } from "msw";
import { API_HOST } from "~/api/fetch";
import { Applicant } from "~/global/types/application";
import { DEFAULT_APPLICANT, VALID_APPLICANT } from "./applicantMock";
import { i18n } from "@lingui/core";
import { allProductsMock } from "~/global/tests/productsMock";
import { Route } from "~/router/routes/_products/applications/$applicationId";
import { applicantFormPOM } from "./ApplicantForm.pom";

interface SetupTestProps {
    applicant?: Applicant,
    applicationId?: string
}

const navigateMock = vi.fn();

vi.mock("@tanstack/react-router", async () => {
    const actual = await vi.importActual("@tanstack/react-router");
    return {
        ...actual,
        useNavigate: () => {
            return navigateMock
        }
    }
});

const DEFAULT_APPLICATION_ID = "c2f82924-612c-4489-b6ad-188d2db447d1";
const INVALID_APPLICATION_ID = "c2f82924-612c-4489";

function setupTest({
    applicant,
    applicationId
}: SetupTestProps = {applicant : DEFAULT_APPLICANT, applicationId: DEFAULT_APPLICATION_ID}) {
    server.use(
        http.get(`${API_HOST}/applications/${applicationId}`, () => {
            if(applicationId === DEFAULT_APPLICATION_ID ) {
                return HttpResponse.json({
                    "id": DEFAULT_APPLICATION_ID,
                    "type": "NEW",
                    "createdAt": "2025-03-06",
                    "productId": 12345,
                    "applicants": [
                        applicant || DEFAULT_APPLICANT
                    ]
                })
            }

            return HttpResponse.error();
        })
    )

    server.use(
        http.get(`${API_HOST}/products`, () => {
            return HttpResponse.json(allProductsMock)
        })
    )
    
    server.use(
        http.put(`${API_HOST}/applications/${applicationId}`, () => {
            return HttpResponse.json({
                "id": applicationId,
                "type": "NEW",
                "createdAt": "2025-03-04",
                "productId": 12347,
                "applicants": [
                    applicant || VALID_APPLICANT
                ]
            })
        })
    )

    const root = createRootRouteWithContext<RouterContext>()();

    const _products = createRoute({
        getParentRoute: () => root,
        id: "_products",
    });

    const applicationEdit = createRoute({
        // Known issue on TSR
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        getParentRoute: () => _products as any,
        loader: Route.options.loader,
        path: "/applications/$applicationId",
        component: ApplicationEdit
    });

    const router = createRouter({
        context: {
            queryClient
        },
        history: createMemoryHistory({
            initialEntries: [`/applications/${applicationId}`]
        }),
        defaultPendingMinMs: 0,
        routeTree: root.addChildren([_products.addChildren([applicationEdit])]),
    });

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

function applicationEditPOM() {
    const searchText = (text: string) => {
        return screen.findByText(text);
    }

    return {
        searchText
    }
}


describe("Application Edit Page", () => {

    afterEach(() => {
        vi.clearAllMocks();
    }) 
    it("Should render the page", async () => {
        setupTest();
        const { searchText } = applicationEditPOM();
        expect(await searchText("Main Applicant Information")).toBeVisible();
    });

    it("will throw an error when an invalid application Id is entered", async () => {
        setupTest({
            applicationId: INVALID_APPLICATION_ID
        });
        const { searchText } = applicationEditPOM();
        expect(await searchText("Something went wrong!")).toBeVisible();
    });

    it("will render selected product info", async () => {
        setupTest();
        const { searchText } = applicationEditPOM();
        expect(await searchText("MCAP Value-Flex Variable Special")).toBeVisible();
    });

    it("will render the form with no data and the submit button disabled when it's a new application", async () => {
        setupTest();
        const { getSubmitButton, getInputField } = applicantFormPOM();
        expect(await getInputField("First Name:")).toHaveValue("");
        expect(await getSubmitButton()).toBeDisabled();
    });

    it.only("will update the application and redirect to applications list when form is submitted with valid data", async () => {
        setupTest();
        const { iCompleteTheFormWithData } = applicantFormPOM();
        await iCompleteTheFormWithData(VALID_APPLICANT);
        expect(navigateMock).toHaveBeenCalledWith(expect.objectContaining({
            to: "/applications"
        }))
    });
})