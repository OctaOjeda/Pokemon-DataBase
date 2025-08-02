const Pokemon = require('./models/Pokemon');
const User = require('./models/User');
const bcrypt = require('bcrypt');

const defaultPokemons = [
  { name: 'Bulbasaur', type: 'grass', level: 5, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  { name: 'Ivysaur', type: 'grass', level: 10, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' },
  { name: 'Venusaur', type: 'grass', level: 32, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png' },
  { name: 'Charmander', type: 'fire', level: 5, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  { name: 'Charmeleon', type: 'fire', level: 16, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png' },
  { name: 'Charizard', type: 'fire', level: 36, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' },
  { name: 'Squirtle', type: 'water', level: 5, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
  { name: 'Wartortle', type: 'water', level: 16, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png' },
  { name: 'Blastoise', type: 'water', level: 36, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png' },
  { name: 'Caterpie', type: 'bug', level: 3, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png' },
  { name: 'Metapod', type: 'bug', level: 7, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png' },
  { name: 'Butterfree', type: 'bug', level: 10, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png' },
  { name: 'Weedle', type: 'bug', level: 3, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png' },
  { name: 'Kakuna', type: 'bug', level: 7, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png' },
  { name: 'Beedrill', type: 'bug', level: 10, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png' },
  { name: 'Pidgey', type: 'normal', level: 3, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png' },
  { name: 'Pidgeotto', type: 'normal', level: 18, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png' },
  { name: 'Pidgeot', type: 'normal', level: 36, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png' },
  { name: 'Rattata', type: 'normal', level: 2, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png' },
  { name: 'Raticate', type: 'normal', level: 20, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png' },
  { name: 'Spearow', type: 'normal', level: 5, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png' },
  { name: 'Fearow', type: 'normal', level: 20, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png' },
  { name: 'Ekans', type: 'poison', level: 6, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png' },
  { name: 'Arbok', type: 'poison', level: 22, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png' },
  { name: 'Pikachu', type: 'electric', level: 7, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
  { name: 'Raichu', type: 'electric', level: 25, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png' },
  { name: 'Sandshrew', type: 'ground', level: 10, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png' },
  { name: 'Sandslash', type: 'ground', level: 22, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png' },
  { name: 'Nidoran♀', type: 'poison', level: 4, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png' },
  { name: 'Nidorina', type: 'poison', level: 16, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png' },
  { name: 'Nidoqueen', type: 'poison', level: 36, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png' },
  { name: 'Nidoran♂', type: 'poison', level: 4, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png' },
  { name: 'Nidorino', type: 'poison', level: 16, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/33.png' },
  { name: 'Nidoking', type: 'poison', level: 36, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png' },
  { name: 'Clefairy', type: 'fairy', level: 10, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png' },
  { name: 'Clefable', type: 'fairy', level: 30, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/36.png' },
  { name: 'Vulpix', type: 'fire', level: 9, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png' },
  { name: 'Ninetales', type: 'fire', level: 30, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png' },
  { name: 'Jigglypuff', type: 'fairy', level: 6, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png' },
  { name: 'Wigglytuff', type: 'fairy', level: 20, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png' },
  { name: 'Zubat', type: 'poison', level: 6, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png' },
  { name: 'Golbat', type: 'poison', level: 22, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png' },
  { name: 'Oddish', type: 'grass', level: 5, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/43.png' },
  { name: 'Gloom', type: 'grass', level: 21, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png' },
  { name: 'Vileplume', type: 'grass', level: 36, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png' },
  { name: 'Paras', type: 'bug', level: 5, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png' },
  { name: 'Parasect', type: 'bug', level: 24, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/47.png' },
  { name: 'Venonat', type: 'bug', level: 10, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/48.png' },
  { name: 'Venomoth', type: 'bug', level: 31, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png' },
  { name: 'Diglett', type: 'ground', level: 8, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png' },
];

const defaultUsers = [
  {
    name: 'Admin',
    lastname: 'Admin',
    username: 'admin',
    email: 'admin@example.com',
    password: '123456', // Will be hashed
  },
];

async function seedDatabase() {
  // Seed Users
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    console.log('👤 Seeding default users...');
    const usersHashed = await Promise.all(defaultUsers.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    })));
    await User.insertMany(usersHashed);
    console.log('✅ Users seeded');
  } else {
    console.log('👥 Users already exist, skipping');
  }

  // Seed Pokémons
  const pokemonCount = await Pokemon.countDocuments();
  if (pokemonCount === 0) {
    console.log('🌱 Seeding default pokemons...');
    await Pokemon.insertMany(defaultPokemons);
    console.log('✅ Pokémons seeded');
  } else {
    console.log('📦 Pokémons already exist, skipping');
  }
}

module.exports = seedDatabase;