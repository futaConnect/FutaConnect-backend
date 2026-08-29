const { getAllNiches } = require('./niches.service');

async function listNiches(req, res) {
  try {
    const niches = await getAllNiches();
    res.json(niches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
}

module.exports = { listNiches };