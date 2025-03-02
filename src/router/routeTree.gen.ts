/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProductsImport } from './routes/_products'
import { Route as ProductsIndexImport } from './routes/_products/index'
import { Route as ProductsApplicationsApplicationIdImport } from './routes/_products/applications/$applicationId'

// Create/Update Routes

const ProductsRoute = ProductsImport.update({
  id: '/_products',
  getParentRoute: () => rootRoute,
} as any)

const ProductsIndexRoute = ProductsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => ProductsRoute,
} as any)

const ProductsApplicationsApplicationIdRoute =
  ProductsApplicationsApplicationIdImport.update({
    id: '/applications/$applicationId',
    path: '/applications/$applicationId',
    getParentRoute: () => ProductsRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_products': {
      id: '/_products'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProductsImport
      parentRoute: typeof rootRoute
    }
    '/_products/': {
      id: '/_products/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof ProductsIndexImport
      parentRoute: typeof ProductsImport
    }
    '/_products/applications/$applicationId': {
      id: '/_products/applications/$applicationId'
      path: '/applications/$applicationId'
      fullPath: '/applications/$applicationId'
      preLoaderRoute: typeof ProductsApplicationsApplicationIdImport
      parentRoute: typeof ProductsImport
    }
  }
}

// Create and export the route tree

interface ProductsRouteChildren {
  ProductsIndexRoute: typeof ProductsIndexRoute
  ProductsApplicationsApplicationIdRoute: typeof ProductsApplicationsApplicationIdRoute
}

const ProductsRouteChildren: ProductsRouteChildren = {
  ProductsIndexRoute: ProductsIndexRoute,
  ProductsApplicationsApplicationIdRoute:
    ProductsApplicationsApplicationIdRoute,
}

const ProductsRouteWithChildren = ProductsRoute._addFileChildren(
  ProductsRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof ProductsRouteWithChildren
  '/': typeof ProductsIndexRoute
  '/applications/$applicationId': typeof ProductsApplicationsApplicationIdRoute
}

export interface FileRoutesByTo {
  '/': typeof ProductsIndexRoute
  '/applications/$applicationId': typeof ProductsApplicationsApplicationIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_products': typeof ProductsRouteWithChildren
  '/_products/': typeof ProductsIndexRoute
  '/_products/applications/$applicationId': typeof ProductsApplicationsApplicationIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/' | '/applications/$applicationId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/applications/$applicationId'
  id:
    | '__root__'
    | '/_products'
    | '/_products/'
    | '/_products/applications/$applicationId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  ProductsRoute: typeof ProductsRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  ProductsRoute: ProductsRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_products"
      ]
    },
    "/_products": {
      "filePath": "_products.tsx",
      "children": [
        "/_products/",
        "/_products/applications/$applicationId"
      ]
    },
    "/_products/": {
      "filePath": "_products/index.tsx",
      "parent": "/_products"
    },
    "/_products/applications/$applicationId": {
      "filePath": "_products/applications/$applicationId.tsx",
      "parent": "/_products"
    }
  }
}
ROUTE_MANIFEST_END */
