import { createInterface } from "node:readline"
import { stdin, stdout } from "node:process"
import { getCommands } from "./helpers.js"

export function startREPL() {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex > ",
    })

    rl.prompt()

    rl.on("line", (input) => {
        if (!input?.trim()) {
            return rl.prompt();
        }
        const commands = getCommands();
        const command = commands[input]

        if (!command) {
            return console.log("Unknown Command");
        }

        try {
            command.callback(commands);
            return rl.prompt();
        } catch (error: any) {
            console.log(error?.message)
        }
    })

}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(" ").filter(Boolean);
}
