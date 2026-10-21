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
