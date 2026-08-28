const { createConsumerProfile, createProviderProfile, getMyProfile } = require('./users.service');

async function createMyConsumerProfile(req, res) {
  try {
    // req.user comes from verifyToken — never trust a role sent in the body
    if (req.user.role !== 'CONSUMER') {
      return res.status(403).json({ error: 'only consumer accounts can create a consumer profile' });
    }

    const { realName, campusLocation, department,username } = req.body;
    if (!realName || !campusLocation || !department || !username) {
      return res.status(400).json({ error: 'realName and campusLocation and department and username are required' });
    }

    const profile = await createConsumerProfile(req.user.userId, { realName, campusLocation, username, department });
    res.status(201).json(profile);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'profile already exists for this user' });
    }
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
}

async function createMyProviderProfile(req, res) {
  try {
    if (req.user.role !== 'PROVIDER') {
      return res.status(403).json({ error: 'only provider accounts can create a provider profile' });
    }

    const { legalName, bio, skillLevel, campusLocation, phoneNumber, whatsappNumber, department, profilePictureUrl, socialLinks, username } = req.body;

    if (!legalName || !username|| !bio || !skillLevel || !campusLocation || !phoneNumber || !whatsappNumber || !department || !profilePictureUrl) {
      return res.status(400).json({ error: 'missing required provider fields' });
    }

    const profile = await createProviderProfile(req.user.userId, {
      legalName,username, bio, skillLevel, campusLocation, phoneNumber, whatsappNumber, department, profilePictureUrl,
      socialLinks: socialLinks || [],
    });

    res.status(201).json(profile);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'profile already exists for this user' });
    }
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
}

async function getMe(req, res) {
  try {
    const profile = await getMyProfile(req.user.userId, req.user.role);
    if (!profile) {
      return res.status(404).json({ error: 'profile not yet created' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
}

module.exports = { createMyConsumerProfile, createMyProviderProfile, getMe };