const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  descrption: { type: String },
  imageUrl: { type: String },
  types: { type: [String], default: [] },
  class: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model('Pokemon', PokemonSchema);