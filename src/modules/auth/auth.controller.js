// src/modules/auth/auth.controller.js
const { registerUser,loginUser } = require('./auth.service');

async function register(req, res) {
  try {
    const { email,  password, role } = req.body;

    // basic presence check — proper validation comes later as its own step
    if (!email  || !password || !role) {
      return res.status(400).json({ error: 'email, username, password, and role are all required' });
    }

    const user = await registerUser({ email, password, role });
    res.status(201).json(user);
  } catch (err) {
    // e.g. duplicate email/username hits Prisma's unique constraint
    if (err.code === 'P2002') {
      return res.status(409).json({ error: `${err.meta.target} already in use` });
    }
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const token = await loginUser({ email, password });
    res.json({ token });
  } catch (err) {
    if (err.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ error: 'invalid email or password' });
    }
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
}

module.exports = { register, login };