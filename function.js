function findPokemonByName(name) {
  const data = db.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (!data) {
    return null;
  }
  return data;
};