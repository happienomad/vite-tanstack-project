import { I18nProvider } from "@lingui/react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./router/routeTree.gen";
import { i18n } from "@lingui/core";
import GlobalStyles from "./GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const router = createRouter({ context: { queryClient: undefined! }, routeTree })

const queryClient = new QueryClient();

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <I18nProvider i18n={i18n}>
                <GlobalStyles />
                <RouterProvider context={{ queryClient }} router={router} />
            </I18nProvider>
        </QueryClientProvider>
    )
}