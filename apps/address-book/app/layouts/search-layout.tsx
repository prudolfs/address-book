import { Form, Link, Outlet } from 'react-router'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

export default function SearchLayout() {
  return (
    <>
      <div className="justify-space-between flex">
        <Form action="/search" method="get">
          <Input type="search" name="q" placeholder="Search..." />
        </Form>
        <Button asChild variant="default">
          <Link to="/address/create">Create New Address</Link>
        </Button>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}
