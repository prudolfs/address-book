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
import { AddressDialogDelete } from '~/components/address-dialog-delete'

export function AddressTable({
  addresses,
}: {
  addresses: Locations['addresses']
}) {
  return (
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
              <AddressDialogDelete id={address.id}>
                <Button variant="destructive" size="icon">
                  <TrashIcon />
                </Button>
              </AddressDialogDelete>
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
  )
}
