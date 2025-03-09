import type { Route } from './+types/home'
import { Form, redirect } from 'react-router'
import type { Location } from '~/types'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

export async function clientLoader({ params }: Route.LoaderArgs) {
  const res = await fetch(`http://localhost:4001/address/${params.id}`)
  const { data } = await res.json()

  return data
}

export async function clientAction({ params, request }: Route.ActionArgs) {
  const formData = await request.formData()
  const body = Object.fromEntries(formData)

  await fetch(`http://localhost:4001/address/edit/${params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return redirect(`/`)
}

export default function AddressEdit({ loaderData }: { loaderData: Location }) {
  const { address, country, zip } = loaderData as Location

  return (
    <Form method="put">
      <Input type="text" name="address" defaultValue={address} />
      <Input type="text" name="country" defaultValue={country} />
      <Input type="text" name="zip" defaultValue={zip} />
      <Button type="submit" variant="default">
        Edit
      </Button>
    </Form>
  )
}
