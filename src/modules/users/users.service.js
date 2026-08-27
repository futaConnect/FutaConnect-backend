const prisma = require('../../config/db');

// creates the consumer profile for the currently logged-in user
async function createConsumerProfile(userId, { realName, campusLocation }) {
  return prisma.consumerProfile.create({
    data: { userId, realName, campusLocation },
  });
}

async function createProviderProfile(userId, data) {
  return prisma.providerProfile.create({
    data: { userId, ...data },
  });
}

module.exports = { createConsumerProfile,  createProviderProfile };