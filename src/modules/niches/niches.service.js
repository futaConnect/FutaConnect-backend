const prisma = require('../../config/db');

async function getAllNiches() {
  return prisma.niche.findMany();
}


async function addProviderNiche(userId, { nicheId, subServices }) {
  const providerProfile = await prisma.providerProfile.findUnique({ where: { userId } });
  if (!providerProfile) {
    throw new Error('PROFILE_NOT_FOUND');
  }

  const existingCount = await prisma.providerNiche.count({
    where: { providerId: providerProfile.id },
  });
  if (existingCount >= 2) {
    throw new Error('MAX_NICHES_REACHED');
  }

  return prisma.providerNiche.create({
    data: { providerId: providerProfile.id, nicheId, subServices: subServices || [] },
  });
}

async function removeProviderNiche(userId, providerNicheId) {
  const providerProfile = await prisma.providerProfile.findUnique({ where: { userId } });
  if (!providerProfile) {
    throw new Error('PROFILE_NOT_FOUND');
  }

  const providerNiche = await prisma.providerNiche.findUnique({ where: { id: providerNicheId } });
  if (!providerNiche || providerNiche.providerId !== providerProfile.id) {
    throw new Error('NOT_YOURS');
  }

  return prisma.providerNiche.delete({ where: { id: providerNicheId } });
}

module.exports = { getAllNiches, addProviderNiche, removeProviderNiche };