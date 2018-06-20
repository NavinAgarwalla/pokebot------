function getPokemonInformations(req, res) {
  const pokemon = req.body.conversation.memory.pokemon;
  const pokemonInfos = findPokemonByName(pokemon.value);

  if (!pokemonInfos) {
    res.json({
      replies: [
        { type: 'text', content: `I don't know a Pokémon called ${pokemon} :(` },
      ],
    });
  } else {
    res.json({
      replies: [
        { type: 'text', content: `🔎${pokemonInfos.name} infos` },
        { type: 'text', content: `Type(s): ${pokemonInfos.types.join(' and ')}` },
        { type: 'text', content: pokemonInfos.description },
        { type: 'picture', content: pokemonInfos.image },
      ],
    });
  }
}