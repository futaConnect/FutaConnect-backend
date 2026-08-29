const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const niches = [
  'Gadget Repair and Sale',
  'Fashion, Cosmetics, and Skincare Products',
  'Graphic Design',
  'Weekly Foodstuff Provision at Bulk Price',
  'Laundry Services',
  'Barbing',
  'Fashion Design and Tailoring',
];

async function main() {
  for (const name of niches) {
    await prisma.niche.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log('niches seeded');
}

main()
  .catch((err) => console.error(err))
  .finally(() => prisma.$disconnect());