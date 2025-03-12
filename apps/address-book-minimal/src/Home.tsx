import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Locations } from '@/types'

async function getAddresses(): Promise<Locations> {
  const res = await fetch('http://localhost:4001')

  if (!res.ok) {
    throw new Error('Network response was not ok')
  }

  return res.json()
}

async function updateAddress({
  id,
  editAddress,
  editCountry,
  editZip,
}: {
  id: number
  editAddress: string
  editCountry: string
  editZip: string
}) {
  const res = await fetch(`http://localhost:4001/address/edit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address: editAddress,
      country: editCountry,
      zip: editZip,
    }),
  })

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
  const updateMutation = useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
  })
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editId, setEditId] = useState<number | null>(null)
  const [editAddress, setEditAddress] = useState<string>('')
  const [editCountry, setEditCountry] = useState<string>('')
  const [editZip, setEditZip] = useState<string>('')
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
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.addresses.map((address) => (
            <TableRow key={address.id}>
              <TableCell>
                {address.id === editId ? (
                  <Input
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.currentTarget.value)}
                  />
                ) : (
                  address.address
                )}
              </TableCell>
              <TableCell>
                {address.id === editId ? (
                  <Input
                    value={editCountry}
                    onChange={(e) => setEditCountry(e.currentTarget.value)}
                  />
                ) : (
                  address.country
                )}
              </TableCell>
              <TableCell>
                {address.id === editId ? (
                  <Input
                    value={editZip}
                    onChange={(e) => setEditZip(e.currentTarget.value)}
                  />
                ) : (
                  address.zip
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteId(address.id)}
                >
                  <TrashIcon />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="default"
                  onClick={() => {
                    if (editId) {
                      updateMutation.mutate({
                        id: editId,
                        editAddress,
                        editCountry,
                        editZip,
                      })
                      setEditAddress('')
                      setEditCountry('')
                      setEditZip('')
                      setEditId(null)
                    } else {
                      setEditAddress(address.address)
                      setEditCountry(address.country)
                      setEditZip(address.zip)
                      setEditId(address.id)
                    }
                  }}
                >
                  <PencilSquareIcon />
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
