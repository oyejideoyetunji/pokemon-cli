import type { State } from "./state.js";


export async function startREPL(state: State) {
    const { rl, commands } = state;
    rl.prompt()

    rl.on("line", async (input) => {
        if (!input?.trim()) {
            return rl.prompt();
        }

        const [commandKey, ...params] = cleanInput(input);
        const command = commands[commandKey as string]

        if (!command) {
            return console.log("Unknown Command");
        }

        try {
            await command.callback(state, ...params);
            return rl.prompt();
        } catch (error: any) {
            console.log(error?.message)
        }
    })

}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(" ").filter(Boolean);
}
