import { stdin, stdout } from "node:process";
import { createInterface, type Interface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { PokeAPI } from "./pokeapi.js";


export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  rl: Interface;
  pokeApi: PokeAPI;
  nextLocationsURL?: string;
  prevLocationsURL?: string;
  commands: Record<string, CLICommand>;
}

export function initState(): State {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });

  const pokeApi = new PokeAPI();

  const commands: Record<string, CLICommand> = {
    help: {
        name: "help",
        description: "help: Displays a help message",
        callback: commandHelp
    },
    exit: {
      name: "exit",
      description: "exit: Exit the Pokedex",
      callback: commandExit
    },
    map: {
      name: "map",
      description: "map: Displays the next 20 location areas in the Pokemon world",
      callback: commandMap
    },
    mapb: {
      name: "mapb",
      description: "map: Displays the next 20 location areas in the Pokemon world",
      callback: commandMapB
    }
  };

  return { rl, pokeApi, commands }
}
