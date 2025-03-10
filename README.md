# Address Book Monorepo

## Development setup
- Instals dependencies for all apps: `pnpm i`

## Back-End setup
- Move from main directory: `cd apps/ember-assignment`
- Generate types for Prisma database client: `pnpm prisma generate`
- Run database creation: `pnpm prisma migrate dev`
- Seed some test data: `pnpm prisma db seed`
- Run the backend server: `pnpm be`

## Run front-end with react-router as a framework
- Move from main directory: `cd apps/address-book`
- Run the app: `pnpm dev`

## Run front-end with react-router as a library
- Move from main directory: `cd apps/address-book-minimal`
- Run the app: `pnpm dev`
