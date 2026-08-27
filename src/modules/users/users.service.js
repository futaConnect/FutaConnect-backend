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
module.exports = { createConsumerProfile, createProviderProfile };