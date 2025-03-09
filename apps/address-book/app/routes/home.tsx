import type { Locations } from '~/types'
import { AddressTable } from '~/components/address-table'

export async function clientLoader() {
  const res = await fetch('http://localhost:4001')
  const { addresses } = await res.json()

  return { addresses }
}

export default function Home({ loaderData }: { loaderData: Locations }) {
  const { addresses } = loaderData

  return <AddressTable addresses={addresses} />
}
