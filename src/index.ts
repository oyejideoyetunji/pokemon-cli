import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  startREPL(initState());
}

main();

// "dev": "tsx watch src/index.ts",
