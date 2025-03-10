import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from '@heroicons/react/24/outline'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './components/ui/dialog'
import { Button } from './components/ui/button'
import { Locations } from './types'

async function getAddresses(): Promise<Locations> {
  const res = await fetch('http://localhost:4001')

  if (!res.ok) {
    throw new Error('Network response was not ok')
  }

  return res.json()
}

async function deleteAddress(id: number) {
  const res = await fetch(`http://localhost:4001/address/delete/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Network response was not ok')
  }

  return res.json()
}

function Home() {
  const queryClient = useQueryClient()
  const query = useQuery({ queryKey: ['addresses'], queryFn: getAddresses })
  const mutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
  })
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const isPending = query.isPending || mutation.isPending
  const isError = query.isError || mutation.isError
  const error = query.error || mutation.error
  const data = query.data

  if (isPending) {
    return (
      <p className="flex h-screen w-screen items-center justify-center">
        Loading...
      </p>
    )
  }

  if (isError) {
    return (
      <p className="flex h-screen w-screen items-center justify-center">
        Error: {error?.message}
      </p>
    )
  }

  return (
    <>
      <Table>
        <TableCaption>A list of addresses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Address</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Zip</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.addresses.map((address) => (
            <TableRow key={address.id}>
              <TableCell>{address.address}</TableCell>
              <TableCell>{address.country}</TableCell>
              <TableCell>{address.zip}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteId(address.id)}
                >
                  <TrashIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Address</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this address?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              variant="destructive"
              onClick={() => {
                if (deleteId) {
                  mutation.mutate(deleteId)
                }
                setDeleteId(null)
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Home
