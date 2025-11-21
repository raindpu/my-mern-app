const express = require('express');
const router = express.Router();
const Gaushala = require('../models/Gaushala');

router.get('/', async (req, res) => {
  try {
    const gaushalas = await Gaushala.find().sort({ createdAt: -1 });
    res.json(gaushalas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const gaushala = await Gaushala.findById(req.params.id);
    if (!gaushala) return res.status(404).json({ error: 'Gaushala not found' });
    res.json(gaushala);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const gaushala = new Gaushala(req.body);
    await gaushala.save();
    res.status(201).json(gaushala);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const gaushala = await Gaushala.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!gaushala) return res.status(404).json({ error: 'Gaushala not found' });
    res.json(gaushala);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const gaushala = await Gaushala.findByIdAndDelete(req.params.id);
    if (!gaushala) return res.status(404).json({ error: 'Gaushala not found' });
    res.json({ message: 'Gaushala deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;