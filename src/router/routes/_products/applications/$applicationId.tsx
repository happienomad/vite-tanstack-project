import { createFileRoute } from '@tanstack/react-router'
import { applicationQueryOptions } from '~/api/queries/queryOptions'
import { ApplicationEdit } from '~/features/application/edit/ApplicationEdit'

export const Route = createFileRoute('/_products/applications/$applicationId')({
  component: ApplicationEdit,
  loader({
    context: { queryClient },
    params: { applicationId }
  }) {
    return {
      queryRef: queryClient.prefetchQuery(applicationQueryOptions(applicationId))
    }
  }
})
