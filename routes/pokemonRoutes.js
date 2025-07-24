const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemon');

// GET all pokemon
router.get('/pokemon', async (req, res) => {
  const pokemon = await Pokemon.find();
  res.json(pokemon);
});

// GET item by ID
router.get('/pokemon/:id', async (req, res) => {
  const item = await Pokemon.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Pokemon not found' });
  res.json(item);
});

// POST create new item
router.post('/pokemon', async (req, res) => {
  const { name, types, class: className } = req.body;
  const newPokemon = new Pokemon({ name, types, class: className });
  await newPokemon.save();
  res.status(201).json(newPokemon);
});

// PUT update item
router.put('/pokemon/:id', async (req, res) => {
  const updated = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE item
router.delete('/pokemon/:id', async (req, res) => {
  await Pokemon.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
