// src/config/db.js
const { PrismaClient } = require('@prisma/client');

// one shared instance — reused across the whole app instead of
// opening a new DB connection every time a file needs Prisma
const prisma = new PrismaClient();

module.exports = prisma;