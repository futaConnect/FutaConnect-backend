const prisma = require('../../config/db');

async function createConnectRequest(userId, { providerId, nicheId }) {
  const consumerProfile = await prisma.consumerProfile.findUnique({ where: { userId } });
  if (!consumerProfile) {
    throw new Error('PROFILE_NOT_FOUND');
  }

  const existingActive = await prisma.connectRequest.findFirst({
    where: {
      consumerId: consumerProfile.id,
      nicheId,
      status: { in: ['PENDING', 'ACCEPTED'] },
    },
  });
  if (existingActive) {
    throw new Error('ACTIVE_REQUEST_EXISTS');
  }

  const provider = await prisma.providerProfile.findUnique({ where: { id: providerId } });
  if (!provider || !provider.isVerified) {
    throw new Error('PROVIDER_NOT_AVAILABLE');
  }

  return prisma.connectRequest.create({
    data: { consumerId: consumerProfile.id, providerId, nicheId },
  });
}

module.exports = { createConnectRequest };