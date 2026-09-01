import { describe, expect, it, test } from "vitest";
import { cleanInput } from "./repl.js";

describe.each([
  {
    input: "Hello  world",
    expected: ["hello", "world"],
  },
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "Input to test cleanInput ",
    expected: ["input", "to", "test", "cleaninput"],
  },
  {
    input: " Check check, check the microphone",
    expected: ["check", "check,", "check", "the", "microphone"],
  }
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        const actual = cleanInput(input);

        expect(actual).toHaveLength(expected.length);

        for (const index in actual) {
            expect(actual[index]).toBe(expected[index]);
        }
    })
});

describe("cleanInput", () => {
  it("returns an array of words when passed a text", () => {
    const words = cleanInput("Hello, welcome to my world!");

    expect(words).toEqual(["hello,", "welcome", "to", "my", "world!"]);
  });
});
