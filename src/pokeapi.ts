export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    try {
      const response = await fetch(pageURL || `${PokeAPI.baseURL}/location-area`);

      return (await response.json()) as ShallowLocations;
    } catch(error: any) {
      throw new Error("Failed to fetch locations, Error: ", error);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    try {
        const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);
  
        return (await response.json()) as Location;
      } catch(error: any) {
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