import type { Route } from './+types/home'
import { Form, redirect } from 'react-router'
import type { Location } from '~/types'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

export async function clientAction({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const body = Object.fromEntries(formData)

  await fetch(`http://localhost:4001/address/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return redirect(`/`)
}

export default function AddressCreate() {
  return (
    <Form method="post">
      <Input type="text" name="address" />
      <Input type="text" name="country" />
      <Input type="text" name="zip" />
      <Button type="submit" variant="default">
        Create
      </Button>
    </Form>
  )
}
