type Person = { name: string; homeworld: string };
type Planet = { name: string };

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}

// fetch only rejects on network failure - a 404 still "succeeds",
// so we have to check response.ok ourselves.
function getJson<T>(url: string): Promise<T> {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} for ${url}`);
    }
    return response.json() as Promise<T>;
  });
}

function fetchPersonPromise(): Promise<Person> {
  const randomId = getRandomInt(83); // some ids in this range don't exist
  return getJson<Person>(`https://swapi.dev/api/people/${randomId}/`);
}

function fetchPlanetPromise(url: string): Promise<Planet> {
  return getJson<Planet>(url);
}

fetchPersonPromise()
  .then((person) => {
    console.log("Person:", person.name);
    return fetchPlanetPromise(person.homeworld);
  })
  .then((planet) => {
    console.log("Homeworld:", planet.name);
  })
  .catch((error: Error) => {
    console.error("Error:", error.message);
  });
