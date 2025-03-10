import type { Route } from './+types/home'
import { Form, Link, redirect } from 'react-router'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { CentredContent } from '~/components/centred-content'

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
    <CentredContent title="Create Address">
      <Form method="put" className="flex flex-col gap-6">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="address">Address</Label>
          <Input id="address" type="text" name="address" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="country">Country</Label>
          <Input id="country" type="text" name="country" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="zip">Zip</Label>
          <Input id="zip" type="text" name="zip" />
        </div>
        <div className="flex justify-end gap-4">
          <Button asChild variant="secondary">
            <Link to="/">Cancel</Link>
          </Button>
          <Button type="submit" variant="default">
            Create
          </Button>
        </div>
      </Form>
    </CentredContent>
  )
}
