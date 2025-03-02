import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Layout from '~/features/layout/Layout'
import { RouterContext } from '~/global/types/router'

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => (
        <Layout>
            <Outlet />
            <TanStackRouterDevtools />
        </Layout>
    ),
})