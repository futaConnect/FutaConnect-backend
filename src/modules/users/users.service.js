const prisma = require('../../config/db');

// creates the consumer profile for the currently logged-in user
async function createConsumerProfile(userId, { realName, campusLocation, department }) {
  return prisma.consumerProfile.create({
    data: { userId, realName, campusLocation, department },
  });
}

async function createProviderProfile(userId, data) {
  return prisma.providerProfile.create({
    data: { userId, ...data },
  });
}

module.exports = { createConsumerProfile,  createProviderProfile };