const { createConnectRequest, getIncomingRequests , respondToRequest  } = require('./connects.service');

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
      return res.status(409).json({ error: 'you already havee an active request in this niche' });
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

async function respond(req, res) {
  try {
    if (req.user.role !== 'PROVIDER') {
      return res.status(403).json({ error: 'only provider accounts can respond to requests' });
    }

    const { decision } = req.body;
    if (decision !== 'ACCEPTED' && decision !== 'REJECTED') {
      return res.status(400).json({ error: 'decision must be ACCEPTED or REJECTED' });
    }

    const updated = await respondToRequest(req.user.userId, req.params.id, decision);
    res.json(updated);
  } catch (err) {
    if (err.message === 'PROFILE_NOT_FOUND') {
      return res.status(404).json({ error: 'complete your provider profile first' });
    }
    if (err.message === 'NOT_YOURS') {
      return res.status(403).json({ error: 'this request does not belong to youu' });
    }
    if (err.message === 'ALREADY_RESPONDED') {
      return res.status(409).json({ error: 'this request has already been responded to' });
    }
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
}

module.exports = { createRequest, listIncoming , respond};