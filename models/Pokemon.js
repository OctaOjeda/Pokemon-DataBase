const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  type:  { type: String, required: true },
  type2:  { type: String, required: false },
  state: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // relación
});

module.exports = mongoose.model('Pokemon', pokemonSchema);