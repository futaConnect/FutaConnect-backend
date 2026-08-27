const { createConsumerProfile } = require('./users.service');

async function createMyConsumerProfile(req, res) {
  try {
    // req.user comes from verifyToken — never trust a role sent in the body
    if (req.user.role !== 'CONSUMER') {
      return res.status(403).json({ error: 'only consumer accounts can create a consumer profile' });
    }

    const { realName, campusLocation } = req.body;
    if (!realName || !campusLocation) {
      return res.status(400).json({ error: 'realName and campusLocation are required' });
    }

    const profile = await createConsumerProfile(req.user.userId, { realName, campusLocation });
    res.status(201).json(profile);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'profile already exists for this user' });
    }
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
}

module.exports = { createMyConsumerProfile };