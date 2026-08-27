// src/modules/auth/auth.service.js
const bcrypt = require('bcrypt');
const prisma = require('../../config/db');

// creates a new user with a hashed password — never store plain text passwords
async function registerUser({ email, username, password, role }) {
  // hash the password before it ever touches the database
  const passwordHash = await bcrypt.hash(password, 10); // 10 = "salt rounds", a reasonable default

  const user = await prisma.user.create({
    data: { email, username, passwordHash, role },
  });

  // strip passwordHash out before returning — never send it back to the client
  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
}

module.exports = { registerUser };