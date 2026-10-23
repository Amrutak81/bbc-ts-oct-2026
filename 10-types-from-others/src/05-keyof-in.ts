type DataResponse<DataShape> = {
  count: number;
  next: string;
  previous: string;
  results: DataShape[];
};

type PokemonData = DataResponse<{ name: string; url: string; id: number }>;
type Pokemon = PokemonData["results"][number]; // keying into a Type

type PokemonAsStrings = Readonly<{ [name in keyof Pokemon]?: string }>;
