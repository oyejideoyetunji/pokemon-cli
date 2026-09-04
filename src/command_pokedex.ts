import type { State } from "./state.js";

export async function commandPokedex(state: State) {
    const pokemonNames = Object.keys(state.pokedex);

    if(!pokemonNames?.length) return console.log("No pokemon has been caught yet!");

    const pokemonNamesDisplay = pokemonNames.reduce((acc, curr) => {
        return acc += `\n - ${curr}`;
    }, "Your Pokedex: ");

    console.log(pokemonNamesDisplay);
}