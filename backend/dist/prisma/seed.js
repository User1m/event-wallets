"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const password = '$2b$10$KND4mTX9KGRJToSh/9ha.u6pmyQmPNaLxw/AQ3yUW6rVKYT33Gi6C';
const prisma = new client_1.PrismaClient();
const orgData = [
    {
        name: 'ETH Denver',
        password,
        email: 'team@ethdenver.com',
        picture: 'https://miro.medium.com/max/1400/0*a0Fw_LmuPG4_JBhV',
        eventUrl: 'https://www.ethdenver.com/',
        users: {
            create: [
                {
                    email: 'jane@mailinator.com',
                },
            ],
        },
    }
];
async function main() {
    console.log(`Start seeding ...`);
    for (const o of orgData) {
        const org = await prisma.org.create({
            data: o,
        });
        console.log(`Created org with id: ${org.id}`);
    }
    console.log(`Seeding finished.`);
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map