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

  async fetchLocation(key: string): Promise<Location> {
    try {
      const cacheEntry = this.#cache.get<Location>(key);
      if(cacheEntry?.value){
        console.log("Fetched from cache");
        return cacheEntry?.value;
      }

      const response = await fetch(`${PokeAPI.baseURL}/location-area/${key}`);
      const location = await response.json() as Location;

      this.#cache.add(key, location)

      return location;
    } catch (error: any) {
      throw new Error("Failed to fetch locations, Error: ", error);
    }
  }

  async fetchPokemon(name: string): Promise<Pokemon> {
    try {
      const cacheEntry = this.#cache.get<Pokemon>(name);
      if(cacheEntry?.value){
        console.log("Fetched from cache");
        return cacheEntry?.value;
      }

      const response = await fetch(`${PokeAPI.baseURL}/pokemon/${name}`);
      const pokemon = await response.json() as Pokemon;

      this.#cache.add(name, pokemon);

      return pokemon;
    } catch (error: any) {
      throw new Error("Failed to fetch pokemon, Error: ", error);
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



export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  past_abilities: PastAbility[];
  forms: Resource[];
  game_indicies: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;

}

type Ability = {
  slot: number;
  is_hidden: boolean;
  ability: Resource;
}

type PastAbility = {
  generation: Resource;
  abilities: Ability[];
}

type GameIndex = {
  game_index: number;
  version: Resource;
}

type HeldItem = {
  item: Resource;
  version_details: HeldItemVersionDetails[];
}

type HeldItemVersionDetails = {
  rarity: number;
  version: Resource;
}