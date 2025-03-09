import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('address/create', 'routes/address-create.tsx'),
  route('address/delete/:id', 'routes/address-delete.tsx'),
  route('address/:id', 'routes/address-edit.tsx'),
] satisfies RouteConfig
