import type { Route } from './+types/home'
import { redirect } from 'react-router'

export async function clientAction({ params }: Route.ActionArgs) {
  await fetch(`http://localhost:4001/address/delete/${params.id}`, {
    method: 'DELETE',
  })

  return redirect(`/`)
}
