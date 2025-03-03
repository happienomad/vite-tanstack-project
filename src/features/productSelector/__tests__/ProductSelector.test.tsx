import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event"
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { createMemoryHistory, createRootRouteWithContext, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { http, HttpResponse } from "msw";
import { server } from "~/global/tests/nodeServer";
import { allProductsMock, multipleProductsWithBestRateMock } from "./productsMock";
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

function setupTest({
    overrides
}: SetupTestProps = { overrides: { products: allProductsMock } }) {
    server.use(
        http.get(`${API_HOST}/products`, () => {
            return HttpResponse.json(overrides?.products)
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

function productSelectorPOM() {
    const user = userEvent.setup();

    const searchText = (text: string) => {
        return screen.findByText(text);
    }

    const searchAllElementsWithText = (text: string) => {
        return screen.findAllByText(text);
    }

    return {
        searchText,
        searchAllElementsWithText
    }
}


describe("ProductSelector", () => {
    it("Should run the test", async () => {
        setupTest();
        const { searchText } = productSelectorPOM();
        expect(await searchText("We found some best products for you")).toBeInTheDocument();
    });

    it("Should select render the product with best rate in `FIXED` category by default", async () => {
        setupTest();
        const { searchText } = productSelectorPOM();
        expect(await searchText("2.04%")).toBeInTheDocument();
    });

    it("Should render two products with best rate when available in 'FIXED' category by default", async() => {
        setupTest({ 
            overrides: { 
                products: multipleProductsWithBestRateMock
            }
        })
        const { searchAllElementsWithText } = productSelectorPOM();
        expect((await searchAllElementsWithText("2.24%")).length).toEqual(2); 
    })
})