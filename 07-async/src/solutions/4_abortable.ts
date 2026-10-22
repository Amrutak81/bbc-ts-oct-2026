type Person = { name: string; homeworld: string };
type Planet = { name: string };

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}

// Aborts the request if it takes longer than `timeoutMs`.
async function getJson<T>(url: string, timeoutMs = 5000): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} for ${url}`);
    }
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
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
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Request aborted due to timeout");
    } else {
      console.error("Error:", error instanceof Error ? error.message : error);
    }
  }
}

main();
