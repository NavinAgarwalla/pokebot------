function getPokemonEvolutions(req, res) {
  const pokemon = req.body.conversation.memory.pokemon;
  const pokemonInfos = findPokemonByName(pokemon.value);

  if (!pokemonInfos) {
    res.json({
      replies: [
        { type: 'text', content: `I don't know a Pokémon called ${pokemon} :(` },
      ],
    });
  } else if (pokemonInfos.evolutions.length === 1) {
    res.json({
      replies: [{ type: 'text', content: `${pokemonInfos.name} has no evolutions.` }],
    });
  } else {
    res.json({
      replies: [
        { type: 'text', content: `🔎${pokemonInfos.name} family` },
        {
          type: 'text',
          content: pokemonInfos.evolutions.map(formatEvolutionString).join('\n'),
        },
        {
          type: 'card',
          content: {
            title: 'See more about them',
            buttons: pokemonInfos.evolutions
              .filter(p => p.id !== pokemonInfos.id) // Remove initial pokemon from list
              .map(p => ({
                type: 'postback',
                title: p.name,
                value: `Tell me more about ${p.name}`,
              })),
          },
        },
      ],
    });
  }
}

function formatEvolutionString(evolution) {
  let base = `🔸 ${evolution.name}`;
  if (evolution.trigger === 'leveling') {
    base += ` -> lvl ${evolution.trigger_lvl}`;
  }
  if (evolution.trigger === 'item') {
    base += ` -> ${evolution.trigger_item}`;
  }
  return base;
}