const prisma = require('../../config/db');

async function browseProviders({ location, availability, nicheId }) {
  return prisma.providerProfile.findMany({
    where: {
      isVerified: true,
      ...(location && { campusLocation: location }),
      ...(availability && { availabilityStatus: availability }),
      ...(nicheId && { niches: { some: { nicheId } } }),
    },
    include: { niches: { include: { niche: true } } },
  });
}
module.exports = {browseProviders};