const { createConnectRequest, getIncomingRequests  } = require('./connects.service');

async function createRequest(req, res) {
  try {
    if (req.user.role !== 'CONSUMER') {
      return res.status(403).json({ error: 'only consumer accounts can send connect requests' });
    }

    const { providerId, nicheId } = req.body;
    if (!providerId || !nicheId) {
      return res.status(400).json({ error: 'providerId and nicheId are required' });
    }

    const connectRequest = await createConnectRequest(req.user.userId, { providerId, nicheId });
    res.status(201).json(connectRequest);
  } catch (err) {
    if (err.message === 'PROFILE_NOT_FOUND') {
      return res.status(404).json({ error: 'complete your consumer profile first' });
    }
    if (err.message === 'ACTIVE_REQUEST_EXISTS') {
      return res.status(409).json({ error: 'you already have an active request in this niche' });
    }
    if (err.message === 'PROVIDER_NOT_AVAILABLE') {
      return res.status(404).json({ error: 'provider not found or not verified' });
    }
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
}


async function listIncoming(req, res) {
  try {
    if (req.user.role !== 'PROVIDER') {
      return res.status(403).json({ error: 'only provider accounts can view incoming requests' });
    }

    const requests = await getIncomingRequests(req.user.userId);
    res.json(requests);
  } catch (err) {
    if (err.message === 'PROFILE_NOT_FOUND') {
      return res.status(404).json({ error: 'complete your provider profile first' });
    }
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
}

module.exports = { createRequest, listIncoming };