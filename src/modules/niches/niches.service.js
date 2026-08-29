const prisma = require('../../config/db');

async function getAllNiches() {
  return prisma.niche.findMany();
}

module.exports = { getAllNiches };