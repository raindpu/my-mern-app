const express = require('express');
const router = express.Router();
const Cow = require('../models/Cow');
const Gaushala = require('../models/Gaushala');

router.get('/', async (req, res) => {
  try {
    const { gaushalaId } = req.query;
    const filter = gaushalaId ? { gaushalaId } : {};
    const cows = await Cow.find(filter).populate('gaushalaId').sort({ createdAt: -1 });
    res.json(cows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cow = await Cow.findById(req.params.id).populate('gaushalaId');
    if (!cow) return res.status(404).json({ error: 'Cow not found' });
    res.json(cow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const cow = new Cow(req.body);
    await cow.save();
    await Gaushala.findByIdAndUpdate(req.body.gaushalaId, { $inc: { totalCows: 1 } });
    res.status(201).json(cow);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const cow = await Cow.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cow) return res.status(404).json({ error: 'Cow not found' });
    res.json(cow);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cow = await Cow.findByIdAndDelete(req.params.id);
    if (!cow) return res.status(404).json({ error: 'Cow not found' });
    await Gaushala.findByIdAndUpdate(cow.gaushalaId, { $inc: { totalCows: -1 } });
    res.json({ message: 'Cow deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;