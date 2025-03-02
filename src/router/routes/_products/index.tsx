import { createFileRoute } from '@tanstack/react-router'
import { ProductSelector } from '~/features/productSelector/ProductSelector'
import { ProductSelectorLoading } from '~/features/productSelector/ProductSelector.loading'

export const Route = createFileRoute("/_products/")({
  component: ProductSelector,
  pendingComponent: ProductSelectorLoading
})