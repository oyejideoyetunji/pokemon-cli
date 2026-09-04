import { stdin, stdout } from "node:process";
import { createInterface, type Interface } from "node:readline";
import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";
import { Cache } from "./pokecache.js";


export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  pokeApi: PokeAPI;
  nextLocationsURL?: string;
  prevLocationsURL?: string;
  pokedex: Record<string, Pokemon>;
  commands: Record<string, CLICommand>;
}

export function initState(): State {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });

  const pokeApi = new PokeAPI(new Cache(120000));

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
      description: "mapb: Displays the next 20 location areas in the Pokemon world",
      callback: commandMapB
    },
    explore: {
      name: "explore",
      description: "explore: See the pokemon names of a give location, pass the location name as argument",
      callback: commandExplore
    },
    catch: {
      name: "catch",
      description: "catch: Catches a pokemon",
      callback: commandCatch
    },
    inspect: {
      name: "inspect",
      description: "inspect: See the details of a pokemon you have caught before",
      callback: commandInspect
    }
  };

  return { rl, pokeApi, commands, pokedex: {} }
}
