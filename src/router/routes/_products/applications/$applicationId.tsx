import { createFileRoute } from '@tanstack/react-router'
import { applicationbyIdQueryOptions } from '~/api/queries/queryOptions'
import { ApplicationEdit } from '~/features/applications/edit/ApplicationEdit'

export const Route = createFileRoute('/_products/applications/$applicationId')({
  component: ApplicationEdit,
  loader({
    context: { queryClient },
    params: { applicationId }
  }) {
    return {
      queryRef: queryClient.prefetchQuery(applicationbyIdQueryOptions(applicationId))
    }
  }
})
