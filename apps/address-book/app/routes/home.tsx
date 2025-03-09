import { Link } from 'react-router'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import type { Locations } from '~/types'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import { DialogDelete } from '~/components/dialog-delete'

export async function clientLoader() {
  const res = await fetch('http://localhost:4001')
  const { addresses } = await res.json()

  return { addresses }
}

export default function Home({ loaderData }: { loaderData: Locations }) {
  const { addresses } = loaderData

  return (
    <div>
      <div className="flex justify-end">
        <Button asChild variant="default">
          <Link to="/address/create">Create New Address</Link>
        </Button>
      </div>
      <Table>
        <TableCaption>A list of addresses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Address</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Zip</TableHead>
            <TableHead>Delete</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {addresses.map((address) => (
            <TableRow key={address.id}>
              <TableCell>{address.address}</TableCell>
              <TableCell>{address.country}</TableCell>
              <TableCell>{address.zip}</TableCell>
              <TableCell>
                <DialogDelete id={address.id}>
                  <Button variant="destructive" size="icon">
                    <TrashIcon />
                  </Button>
                </DialogDelete>
              </TableCell>
              <TableCell>
                <Button asChild variant="default" size="icon">
                  <Link to={`/address/${address.id}`}>
                    <PencilSquareIcon />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
