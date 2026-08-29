const { getAllNiches, addProviderNiche } = require('./niches.service');

async function listNiches(req, res) {
  try {
    const niches = await getAllNiches();
    res.json(niches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
}

async function addMyNiche(req, res) {
  try {
    if (req.user.role !== 'PROVIDER') {
      return res.status(403).json({ error: 'only provider accounts can add niches' });
    }

    const { nicheId, subServices } = req.body;
    if (!nicheId) {
      return res.status(400).json({ error: 'nicheId is required' });
    }

    const providerNiche = await addProviderNiche(req.user.userId, { nicheId, subServices });
    res.status(201).json(providerNiche);
  } catch (err) {
    if (err.message === 'PROFILE_NOT_FOUND') {
      return res.status(404).json({ error: 'complete your provider profile first' });
    }
    if (err.message === 'MAX_NICHES_REACHED') {
      return res.status(400).json({ error: 'providers can only select up to 2 niches' });
    }
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'you already added this niche' });
    }
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
}

module.exports = { listNiches, addMyNiche };