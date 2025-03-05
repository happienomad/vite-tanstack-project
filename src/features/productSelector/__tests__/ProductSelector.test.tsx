import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event"
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { createMemoryHistory, createRootRouteWithContext, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { http, HttpResponse } from "msw";
import { server } from "~/global/tests/nodeServer";
import { allProductsMock } from "./productsMock";
import { ProductSelector } from "../ProductSelector";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/api/queryClient";
import { RouterContext } from "~/global/types/router";
import { Route } from "~/router/routes/_products";
import { Product } from "~/global/types/product";
import { API_HOST } from "~/api/fetch";

interface SetupTestProps {
    overrides?: {
        products: Product[];
    }
}


/* Test setup */

function setupTest({
    overrides
}: SetupTestProps = { overrides: { products: allProductsMock } }) {
    server.use(
        http.get(`${API_HOST}/products`, () => {
            return HttpResponse.json(overrides?.products)
        })
    )

    server.use(
        http.post(`${API_HOST}/applications`, () => {
            return HttpResponse.json({
                "id": "c2f82924-612c-4489-b6ad-188d2db447d1",
                "type": "NEW",
                "createdAt": "2025-03-04",
                "productId": 12347,
                "applicants": [
                    {
                        "phone": "",
                        "email": "",
                        "firstName": "",
                        "lastName": ""
                    }
                ]
            })
        })
    )

    const root = createRootRouteWithContext<RouterContext>()();

    const _products = createRoute({
        getParentRoute: () => root,
        id: "_products",
        loader: Route.options.loader
    });

    const productsIndex = createRoute({
        getParentRoute: () => root,
        path: "/",
        component: ProductSelector,
    });

    const router = createRouter({
        context: {
            queryClient
        },
        history: createMemoryHistory({
            initialEntries: ["/"]
        }),
        defaultPendingMinMs: 0,
        routeTree: root.addChildren([
            _products.addChildren([productsIndex])
        ]),
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

/* Test POM */

function productSelectorPOM() {
    const user = userEvent.setup();

    const searchText = (text: string) => {
        return screen.findByText(text);
    }

    const searchAllElementsWithText = (text: string) => {
        return screen.findAllByText(text);
    }

    const iChooseProduct = (productName: string) => {
        const button = screen.getByRole("button", {
            name: `Select ${productName}`
        });

        if(button) {
            return user.click(button);
        } else {
            throw new Error(`Unable to find button for product ${productName}`);
        }
    } 

    return {
        searchText,
        searchAllElementsWithText,
        iChooseProduct
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

/* Tests */

describe("ProductSelector", () => {

    afterEach(() => {
        vi.clearAllMocks();
    })

    it("Should render the page", async () => {
        setupTest();
        const { searchText } = productSelectorPOM();
        expect(await searchText("We found some best products for you")).toBeInTheDocument();
    });

    it("Should render the product with best rate in each category", async () => {
        setupTest();
        const { searchText } = productSelectorPOM();
        expect(await searchText("2.04%")).toBeInTheDocument();
        expect(await searchText("1.25%")).toBeInTheDocument();
    });

    it("Should redirect user to application page after a product is selected", async () => {
        setupTest();
        const { searchText, iChooseProduct } = productSelectorPOM();
        expect(await searchText("MCAP Value-Flex Variable Special")).toBeInTheDocument();
        await iChooseProduct("MCAP Value-Flex Variable Special");
        expect(navigateMock).toHaveBeenCalledWith(expect.objectContaining({
            to: `/applications/$applicationId`,
            params: {
                applicationId: "c2f82924-612c-4489-b6ad-188d2db447d1"
            }
        }))
    });
});