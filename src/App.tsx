import { I18nProvider } from "@lingui/react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./router/routeTree.gen";
import { i18n } from "@lingui/core";

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const router = createRouter({ routeTree })


export function App() {
    return (
        <I18nProvider i18n={i18n}>
            <RouterProvider router={router} />
        </I18nProvider>
    )
}