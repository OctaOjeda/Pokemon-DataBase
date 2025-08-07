const express = require('express');
const mongoose = require('mongoose');
const Pokemon = require('../models/Pokemon');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Crear Pokémon (requiere login)
router.post('/', auth, async (req, res) => {
  try {
    const pokemon = new Pokemon({ ...req.body, owner: req.user.id });
    await pokemon.save();
    res.status(201).json(pokemon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos
router.get('/', async (req, res) => {
  const pokemons = await Pokemon.find().populate('owner', 'username');
  res.json(pokemons);
});

// Obtener uno
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID no válido' });
    }
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) return res.status(404).json({ error: 'No encontrado' });
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Editar
router.put('/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID no válido' });
    }
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) return res.status(404).json({ error: 'No encontrado' });

    // if (pokemon.owner.toString() !== req.user.id)
    //   return res.status(403).json({ error: 'No autorizado' });

    Object.assign(pokemon, req.body);
    await pokemon.save();
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Borrar
router.delete('/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID no válido' });
    }
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) return res.status(404).json({ error: 'No encontrado' });

    // if (pokemon.owner.toString() !== req.user.id)
    //   return res.status(403).json({ error: 'No autorizado' });

    await pokemon.deleteOne(pokemon)
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;