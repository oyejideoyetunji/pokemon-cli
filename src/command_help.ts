import type { State } from "./state.js";

export function commandHelp(state: State) {
  console.log("Welcome to the Pokedex!")
  console.log("Usage: \n")
  for (const key in state.commands) {
    console.log(state.commands[key]?.description);
  }
}
