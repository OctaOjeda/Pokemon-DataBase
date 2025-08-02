const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  image: { type: String, required: false },
  level: { type: Number, required: false },
  type:  { type: String, required: true },
  type2:  { type: String, required: false },
  state: { type: String, default: 'Normal', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // relación
});

module.exports = mongoose.model('Pokemon', pokemonSchema);