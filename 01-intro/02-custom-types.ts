type User = {
  name?: string;
  role?: string;
  location?: string;
};

interface IUser {
  name?: string;
  role?: string;
  location?: string;
}

const user: IUser = {};

user.name = "George";

type BirdType = {
  wings: 2;
};

interface BirdInterface {
  wings: 2;
}

const bird1: BirdType = { wings: 2 };
const bird2: BirdInterface = { wings: 2 };
const bird3: BirdType = bird2;

type Owl = BirdType & { nocturnal: true };
type Robin = BirdInterface & { nocturnal: false };

interface Chicken extends BirdInterface {
  colourful: false;
  flies: false;
}

interface Peacock extends BirdType {
  colourful: true;
  flies: false;
}

interface Chicken {
  laysEggs: true;
} // interfaces are open!

let plucky: Chicken = {};
let rob: Robin = { wings: 2, nocturnal: false };

type ValidStatusCodes = 200 | 201 | 202; // Can only be done by type!

const statusCode: ValidStatusCodes = 202;
