import { PrismaClient } from '@prisma/client'
import Fastify from 'fastify'
import cors from '@fastify/cors'

const main = async () => {
  const prisma = new PrismaClient()
  const server = Fastify({ logger: true })
  server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })

  server.get('/', async (_request) => {
    const addresses = await prisma.address.findMany()

    return { addresses }
  })

  server.get('/search/:q', async (request) => {
    const { q } = request.params as { q: string }

    const addresses = await prisma.address.findMany({
      where: {
        OR: [
          {
            address: {
              contains: q,
            },
          },
          {
            country: {
              contains: q,
            },
          },
          {
            zip: {
              contains: q,
            },
          },
        ],
      },
    })

    return { addresses }
  })

  server.get('/address/:id', async (request) => {
    const { id } = request.params as { id: string }

    const address = await prisma.address.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    return { data: address }
  })

  server.put('/address/edit/:id', async (request) => {
    const { id } = request.params as { id: string }
    const { address, country, zip } = request.body as {
      address: string
      country: string
      zip: string
    }

    const updatedAddress = await prisma.address.update({
      where: {
        id: parseInt(id),
      },
      data: {
        address,
        country,
        zip,
      },
    })

    return { data: updatedAddress }
  })

  server.post('/address/create', async (request) => {
    const { address, country, zip } = request.body as {
      address: string
      country: string
      zip: string
    }

    const newAddress = await prisma.address.create({
      data: {
        address,
        country,
        zip,
      },
    })

    return { data: newAddress }
  })

  server.delete('/address/delete/:id', async (request) => {
    const { id } = request.params as { id: string }

    const address = await prisma.address.delete({
      where: {
        id: parseInt(id),
      },
    })

    return { data: address }
  })

  try {
    await server.listen({
      port: 4001,
    })
  } catch (err) {
    console.error(err)
    await prisma.$disconnect()
  }
}

main()
