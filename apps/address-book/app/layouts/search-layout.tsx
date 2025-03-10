import { Form, Link, Outlet } from 'react-router'
import {
  MagnifyingGlassCircleIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

export default function SearchLayout() {
  return (
    <div className="p-24">
      <div className="rounded-lg bg-white px-16 py-24 shadow-lg">
        <div>
          <h1 className="mb-16 text-center text-4xl font-semibold text-gray-700">
            Address List
          </h1>
        </div>
        <div className="mb-16 flex gap-8">
          <Form action="/search" method="get" className="relative w-full">
            <Input type="search" name="q" placeholder="Search..." />
            <MagnifyingGlassCircleIcon className="absolute right-2 top-1.5 h-6 w-6 text-gray-400" />
          </Form>
          <Button asChild variant="default">
            <Link to="/address/create">
              <PlusCircleIcon /> Create New Address
            </Link>
          </Button>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
