import type { Route } from './+types/home'
import { Form, Link, redirect } from 'react-router'
import type { Location } from '~/types'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { CentredContent } from '~/components/centred-content'

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
    <CentredContent title="Edit Address">
      <Form method="put" className="flex flex-col gap-6">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            name="address"
            defaultValue={address}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            type="text"
            name="country"
            defaultValue={country}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="zip">Zip</Label>
          <Input id="zip" type="text" name="zip" defaultValue={zip} />
        </div>
        <div className="flex justify-end gap-4">
          <Button asChild variant="secondary">
            <Link to="/">Cancel</Link>
          </Button>
          <Button type="submit" variant="default">
            Edit
          </Button>
        </div>
      </Form>
    </CentredContent>
  )
}
