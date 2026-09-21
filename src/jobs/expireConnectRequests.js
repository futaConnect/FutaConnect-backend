const cron = require('node-cron');
const prisma = require('../config/db');

async function expireStaleRequests() {
//   const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
const tenMinutesAgo = new Date(Date.now() - 30 * 1000); // TEMP: 30 seconds for testing

  const result = await prisma.connectRequest.updateMany({
    where: {
      status: 'PENDING',
      requestedAt: { lt: tenMinutesAgo },
    },
    data: { status: 'EXPIRED' },
  });

  if (result.count > 0) {
    console.log(`expired ${result.count} stale connect request(s)`);
  }
}

// runs every minute
function startExpiryJob() {
//   cron.schedule('* * * * *', expireStaleRequests);
cron.schedule('*/10 * * * * *', expireStaleRequests); // TEMP: every 10s for testing
}

module.exports = startExpiryJob;