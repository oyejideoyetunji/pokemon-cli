import type { State } from "./state.js";

export async function commandExplore(state: State, ...params: string[]){
  const locationName = params[0];
  if (!locationName) {
    throw new Error("location name is required");
  }

  const location = await state.pokeApi.fetchLocation(locationName)
  const pokemonNames = location.pokemon_encounters.reduce((acc, curr) => {
    return acc += "\n" + curr.pokemon.name;
  }, "Found Pokemon: ");

  console.log(pokemonNames);
}
