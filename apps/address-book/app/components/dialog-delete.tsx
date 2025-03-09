import { Form } from 'react-router'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'

export function DialogDelete({
  id,
  children,
}: {
  id: number
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Address</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this address?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Form action={`address/delete/${id}`} method="delete">
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
