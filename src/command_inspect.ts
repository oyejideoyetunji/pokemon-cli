import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
    const pokemonName = args[0];
    if (!pokemonName || !Number.isNaN(Number(pokemonName))) {
      throw new Error("Only pass a valid pokemon name");
    }

    const pokemon = state.pokedex[pokemonName];

    if(!pokemon) return console.log("You have not caught that pokemon");

    const stats = pokemon.stats.reduce((acc, curr) => {
        return acc += "\n" + ` -${curr.stat.name}: ${curr.base_stat}`
    }, "Stats: ");

    const types = pokemon.types.reduce((acc, curr) => {
        return acc += "\n" + ` - ${curr.type.name}`;
    }, "Types: ");

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(stats);
    console.log(types);
}
