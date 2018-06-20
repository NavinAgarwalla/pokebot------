const express = require('express');
const bodyParser = require('body-parser');
const db = require('./pokedex.json');

const app = express();
app.use(bodyParser.json());

// Load routes
app.post('/pokemon-informations', getPokemonInformations);
app.post('/pokemon-evolutions', getPokemonEvolutions);
app.post('/errors', function (req, res) {
  console.error(req.body);
  res.sendStatus(200);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);});