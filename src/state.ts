import { stdin, stdout } from "node:process";
import { createInterface, type Interface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";


export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
}

export function initState(): State {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });

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
  };

  return { rl, commands}
}
