// src/modules/auth/auth.service.js
const bcrypt = require('bcrypt');
const prisma = require('../../config/db');
const jwt = require('jsonwebtoken');

// creates a new user with a hashed password — never store plain text passwords
async function registerUser({ email, password, role }) {
  // hash the password before it ever touches the database
  const passwordHash = await bcrypt.hash(password, 10); // 10 = "salt rounds", a reasonable default

  const user = await prisma.user.create({
    data: { email, passwordHash, role },
  });

  // strip passwordHash out before returning — never send it back to the client
  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
}

// finds the user, checks the password, returns a signed token if valid
async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('INVALID_CREDENTIALS'); // same error for wrong email or wrong password — don't reveal which
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return token;
}

module.exports = { registerUser, loginUser  };