require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');

const app = express();
// app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/pokemons', require('./routes/pokemons'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));