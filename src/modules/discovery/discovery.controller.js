const { browseProviders } = require('./discovery.service');

async function listProviders(req, res) {
  try {
    const providers = await browseProviders();
    res.json(providers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
}

module.exports = { listProviders };