import type { Route } from './+types/home'
import { redirect } from 'react-router'
import type { Locations } from '~/types'
import { AddressTable } from '~/components/address-table'

export async function clientLoader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')

  if (!q) {
    return redirect('/')
  }

  const res = await fetch(`http://localhost:4001/search/${q}`)
  const { addresses } = await res.json()

  return { addresses }
}

export default function Search({ loaderData }: { loaderData: Locations }) {
  const { addresses } = loaderData

  return <AddressTable addresses={addresses} />
}