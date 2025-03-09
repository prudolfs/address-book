import { type RouteConfig, layout, index, route } from '@react-router/dev/routes'

export default [
  layout('layouts/search-layout.tsx', [
    index('routes/home.tsx'),
    route('search', 'routes/search.tsx'),
  ]),
  route('address/create', 'routes/address-create.tsx'),
  route('address/delete/:id', 'routes/address-delete.tsx'),
  route('address/:id', 'routes/address-edit.tsx'),
] satisfies RouteConfig
