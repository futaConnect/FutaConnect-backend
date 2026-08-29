const prisma = require('../../config/db');

async function browseProviders() {
  return prisma.providerProfile.findMany({
    where: { isVerified: true },
    include: { niches: { include: { niche: true } } },
  });
}

module.exports = { browseProviders };