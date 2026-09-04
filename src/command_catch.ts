import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  const pokemonName = args[0];
  if (!pokemonName || !Number.isNaN(Number(pokemonName))) {
    throw new Error("Only pass a valid pokemon name");
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemon = await state.pokeApi.fetchPokemon(pokemonName);
  const throwWeight = Math.floor(Math.random() * pokemon.base_experience);
  const isCatch = throwWeight % 3 !== 0;

  if (isCatch) {
    state.pokedex[pokemonName] = pokemon;
  }

  console.log(isCatch ? `${pokemonName} was caught!` : `${pokemonName} escaped!`);
}
