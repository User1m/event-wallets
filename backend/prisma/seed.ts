import { PrismaClient, Prisma } from '@prisma/client'

const password =
  '$2b$10$KND4mTX9KGRJToSh/9ha.u6pmyQmPNaLxw/AQ3yUW6rVKYT33Gi6C'; // Password@1

const prisma = new PrismaClient()

// https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-nestjs/prisma
const orgData: Prisma.OrgCreateInput[] = [
  {
    name: 'ETH Denver',
    password,
    email: 'team@ethdenver.com',
    picture: 'https://miro.medium.com/max/1400/0*a0Fw_LmuPG4_JBhV',
    eventUrl: 'https://event-wallets.herokuapp.com/eth-denver-2023',
    eventSlug: 'eth-denver-2023',
    users: {
      create: [
        {
          email: 'jane@mailinator.com',
          // accAddress: ''
        },
      ],
    },
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const o of orgData) {
    const org = await prisma.org.create({
      data: o,
    })
    console.log(`Created org with id: ${org.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
