type GithubUser = {
  name: string;
  location: string;
  bio: string;
  blog: string;
  followers: number;
};

class CustomError extends Error {}

interface User extends GithubUser {
  // User will start from GithubUser and add more things in
  company: "BBC";
}

type Planet = {
  name: string;
  terrain: string;
};

type DataResponse<DataShape> = {
  count: number;
  next: string;
  previous: string;
  results: DataShape[];
};

type PokemonData = DataResponse<{ name: string; url: string }>;

async function fetchData<WebData extends { count: number }>( // WebData MUST EXTEND {count:number}
  url: string,
): Promise<WebData> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = response.json();
  return data;
}

const user = await fetchData<DataResponse<GithubUser>>(
  "https://swapi.dev/api/planets/1",
);
console.log(user);

const pokemon = await fetchData<PokemonData>(
  "https://pokeapi.co/api/v2/pokemon",
);
console.log(pokemon.count);

const otherResponse =
  await fetchData<DataResponse<boolean>>("https://google.com");

const test = otherResponse.results[0];
