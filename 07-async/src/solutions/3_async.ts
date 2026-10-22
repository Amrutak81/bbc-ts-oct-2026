type Person = { name: string; homeworld: string };
type Planet = { name: string };

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}

// fetch only rejects on network failure - a 404 still "succeeds",
// so we have to check response.ok ourselves.
async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} for ${url}`);
  }
  return (await response.json()) as T;
}

async function fetchPersonAsync(): Promise<Person> {
  const randomId = getRandomInt(83); // some ids in this range don't exist
  return getJson<Person>(`https://swapi.dev/api/people/${randomId}/`);
}

async function fetchPlanetAsync(url: string): Promise<Planet> {
  return getJson<Planet>(url);
}

async function main() {
  try {
    const person = await fetchPersonAsync();
    console.log("Person:", person.name);
    const planet = await fetchPlanetAsync(person.homeworld);
    console.log("Homeworld:", planet.name);
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
  }
}

main();
