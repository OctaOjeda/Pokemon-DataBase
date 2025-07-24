const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/api-catalog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

app.use('/api', pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
