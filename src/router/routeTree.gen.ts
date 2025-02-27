/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as HomeImport } from './routes/home'
import { Route as IndexImport } from './routes/index'
import { Route as ApplicationIndexImport } from './routes/application/index'

// Create/Update Routes

const HomeRoute = HomeImport.update({
  id: '/home',
  path: '/home',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ApplicationIndexRoute = ApplicationIndexImport.update({
  id: '/application/',
  path: '/application/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/home': {
      id: '/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof HomeImport
      parentRoute: typeof rootRoute
    }
    '/application/': {
      id: '/application/'
      path: '/application'
      fullPath: '/application'
      preLoaderRoute: typeof ApplicationIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/home': typeof HomeRoute
  '/application': typeof ApplicationIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/home': typeof HomeRoute
  '/application': typeof ApplicationIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/home': typeof HomeRoute
  '/application/': typeof ApplicationIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/home' | '/application'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/home' | '/application'
  id: '__root__' | '/' | '/home' | '/application/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  HomeRoute: typeof HomeRoute
  ApplicationIndexRoute: typeof ApplicationIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  HomeRoute: HomeRoute,
  ApplicationIndexRoute: ApplicationIndexRoute,
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
        "/",
        "/home",
        "/application/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/home": {
      "filePath": "home.tsx"
    },
    "/application/": {
      "filePath": "application/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
