import { createFileRoute, Outlet } from '@tanstack/react-router'
import { productsQueryOptions } from '~/api/queries/queryOptions'

export const Route = createFileRoute("/_products")({
    component: Outlet,
    loader({
        context: { queryClient }
    }) {
        console.log("Hitting the loader method");
        return {
            queryRef: queryClient.prefetchQuery(productsQueryOptions)
        }
    },
});