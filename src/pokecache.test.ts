import { describe, it, expect } from "vitest";
import { Cache } from "./pokecache.js";

const testData = [
  {
    key: "https://pokeapi.co/api/v2/location-area?offset=0&limit=20",
    value: [
      {
        name: "canalave-city-area",
        url: "https://pokeapi.co/api/v2/location-area/1/",
      },
      {
        name: "eterna-city-area",
        url: "https://pokeapi.co/api/v2/location-area/2/",
      },
    ],
  },
  {
    key: "https://pokeapi.co/api/v2/location-area?offset=20&limit=20",
    value: [
      {
        name: "mt-coronet-1f-route-216",
        url: "https://pokeapi.co/api/v2/location-area/21/",
      },
      {
        name: "mt-coronet-1f-route-211",
        url: "https://pokeapi.co/api/v2/location-area/22/",
      },
    ],
  },
];

describe("pokecache", () => {
  it.concurrent.for(testData)("successfully adds an entry to cache", ({ key, value}) => {
    const cache = new Cache(60000);

    cache.add(key, value)
    const cacheEntry = cache.get<typeof value>(key)

    expect(cacheEntry.value).toEqual(value)
  });

  it.concurrent.for(testData)("successfully cleans up cache after the set interval", async ({ key, value }) => {
    const cache = new Cache(2000);
    cache.add(key, value)

    await new Promise(resolve => setTimeout(resolve, 2500));

    const cacheEntry = cache.get(key)
    expect(cacheEntry).toBe(undefined)
  });
});
