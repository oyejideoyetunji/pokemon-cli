import type { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor(cache: Cache) {
    this.#cache = cache;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    try {
      const url = pageURL || `${PokeAPI.baseURL}/location-area?offset=0&limit=20`;

      const cacheEntry = this.#cache.get<ShallowLocations>(url);
      if(cacheEntry?.value){
        console.log("Fetched from cache");
        return cacheEntry?.value;
      }

      const response = await fetch(url);
      const locations = await response.json() as ShallowLocations;

      this.#cache.add(url, locations)

      return locations;
    } catch (error: any) {
      throw new Error("Failed to fetch locations, Error: ", error);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    try {
      const cacheEntry = this.#cache.get<Location>(locationName);
      if(cacheEntry?.value){
        console.log("Fetched from cache");
        return cacheEntry?.value;
      }

      const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);
      const location = await response.json() as Location;

      this.#cache.add(locationName, location)

      return location;
    } catch (error: any) {
      throw new Error("Failed to fetch locations, Error: ", error);
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Resource[];
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  names: LocationName[];
  location: Resource;
  pokemon_encounters: PokemonEncounter[];
  encounter_method_rates: EncounterMethodRate[];
};

type Resource = {
  name: string;
  url: string;
};

type LocationName = {
  name: string;
  language: Resource;
};

type EncounterDetail = {
  min_level: number;
  max_level: number;
  condition_values: any[];
  chance: number;
  method: Resource;
};

type PokemonEncounterVersionDetail = {
  version: Resource;
  max_chance: number;
  encounter_details: EncounterDetail[];
};

type PokemonEncounter = {
  pokemon: Resource;
  version_details: PokemonEncounterVersionDetail[];
};

type EncounterMethodRate = {
  encounter_method: Resource;
  version_details: EncounterMethodRateVersion[];
};

type EncounterMethodRateVersion = {
  rate: number;
  version: Resource;
};
