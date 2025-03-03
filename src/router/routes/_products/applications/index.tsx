import { createFileRoute } from '@tanstack/react-router'
import { applicationsQueryOptions } from '~/api/queries/queryOptions'
import { ApplicationsList } from '~/features/applications/applicationsList/ApplicationsList'

export const Route = createFileRoute('/_products/applications/')({
  component: ApplicationsList,
  loader({
    context: { queryClient}
  }) {
    return {
      queryRef: queryClient.prefetchQuery(applicationsQueryOptions())
    }
  }
})
