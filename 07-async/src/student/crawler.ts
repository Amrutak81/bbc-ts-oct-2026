// Web crawler: fetch a random Star Wars person, then fetch their homeworld.
// https://swapi.dev/api/people/{id}/  -> { name, homeworld (a URL), ... }

type Person = { name: string; homeworld: string };
type Planet = { name: string };

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}

// TODO: write a version using callbacks, promises, or async/await.
// Remember: fetch() only rejects on network failure. A missing person
// (some ids in 1-83 don't exist) comes back as a 404 - check response.ok.
// Bonus: abort the request if it takes longer than 5 seconds.
