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

async function createProviderProfile(userId, data) {
  return prisma.providerProfile.create({
    data: { userId, ...data },
  });
}

module.exports = { createConsumerProfile, createProviderProfile };