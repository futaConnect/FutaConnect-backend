const prisma = require('../../config/db');

async function createConsumerProfile(userId, { username, realName, campusLocation, department }) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.update({
      where: { id: userId },
      data: { username },
    });

    const profile = await tx.consumerProfile.create({
      data: { userId, realName, campusLocation, department },
    });

    return { ...profile, username: user.username };
  });
}

async function createProviderProfile(userId, { username, ...profileData }) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.update({
      where: { id: userId },
      data: { username },
    });

    const profile = await tx.providerProfile.create({
      data: { userId, ...profileData },
    });

    return { ...profile, username: user.username };
  });
}

async function getMyProfile(userId, role) {
  if (role === 'CONSUMER') {
    const profile = await prisma.consumerProfile.findUnique({ where: { userId } });
    if (!profile) return null;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return { ...profile, username: user.username, email: user.email };
  }

  if (role === 'PROVIDER') {
    const profile = await prisma.providerProfile.findUnique({ where: { userId } });
    if (!profile) return null;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return { ...profile, username: user.username, email: user.email };
  }
}
module.exports = { createConsumerProfile, createProviderProfile , getMyProfile};