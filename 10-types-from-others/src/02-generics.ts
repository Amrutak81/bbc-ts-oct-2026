function firstElement<ElementType>(a: ElementType[]): ElementType | undefined {
  const value = a[0];
  return value;
}

function beforeElements(a: string[]) {
  const value = a[0];

  if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    return value;
  } else {
    return 0;
  }
}

const a_s = ["1", "2", "3"];
const a_n = [1, 2, 3];
const a_m = ["1", 2, true];

const element = firstElement(a_s); // string
const element2 = beforeElements(a_s); // string

if (element) {
  element;
}

type GithubUser = {
  name: string;
  location: string;
  bio: string;
  blog: string;
  followers: number;
};

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

async function fetchData<WebData>(url: string): Promise<WebData> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = response.json();
  return data;
}

const user = await fetchData<GithubUser>("https://swapi.dev/api/planets/1");
console.log(user);

const pokemon = await fetchData<PokemonData>(
  "https://pokeapi.co/api/v2/pokemon",
);
console.log(pokemon.count);
