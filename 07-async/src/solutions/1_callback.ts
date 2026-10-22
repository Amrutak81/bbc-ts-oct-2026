type Person = { name: string; homeworld: string };
type Planet = { name: string };

type Callback<T> = (error: Error | null, data?: T) => void;

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}

// fetch only rejects on network failure - a 404 still "succeeds",
// so we have to check response.ok ourselves.
function getJson<T>(url: string, callback: Callback<T>) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} for ${url}`);
      }
      return response.json() as Promise<T>;
    })
    .then((data) => callback(null, data))
    .catch((error) => callback(error));
}

function fetchPerson(callback: Callback<Person>) {
  const randomId = getRandomInt(83); // some ids in this range don't exist
  getJson<Person>(`https://swapi.dev/api/people/${randomId}/`, callback);
}

function fetchPlanet(url: string, callback: Callback<Planet>) {
  getJson<Planet>(url, callback);
}

fetchPerson((error, person) => {
  if (error || !person) {
    console.error("Error fetching person:", error?.message);
    return;
  }
  console.log("Person:", person.name);
  fetchPlanet(person.homeworld, (error, planet) => {
    if (error || !planet) {
      console.error("Error fetching planet:", error?.message);
      return;
    }
    console.log("Homeworld:", planet.name);
  });
});
