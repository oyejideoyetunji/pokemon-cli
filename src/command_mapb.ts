import type { State } from "./state.js";

export async function commandMapB(state: State) {
  const locationsResponse = await state.pokeApi.fetchLocations(state.prevLocationsURL);

  if(locationsResponse.next) state.nextLocationsURL = locationsResponse.next;
  if(locationsResponse.previous) state.prevLocationsURL = locationsResponse.previous;

  const locationsDisplay = locationsResponse.results.reduce((acc, curr) => {
    return acc += (acc?"\n":"") + curr.name;
  }, "");

  console.log(locationsDisplay);
}
