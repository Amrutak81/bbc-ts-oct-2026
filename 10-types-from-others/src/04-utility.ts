Promise<boolean>;
Array<string>;

type GithubUser = {
  id?: string;
  name: string;
  location?: Geolocation;
  bio: string;
  blog: string;
  followers: number;
  avatar_url: string;
};

const george: Partial<GithubUser> = {};

// const emma: Required<GithubUser> = {
//   id: "1",
//   name: "Emma",
//   location: {},
//   bio: "Software developer",
//   blog: "https://emma.dev",
//   followers: 100,
//   avatar_url: "https://example.com/avatar.jpg",
// };

type UserBio = Pick<GithubUser, "bio" | "name" | "location">;

type AnonUser = Omit<GithubUser, "id" | "name" | "location" | "bio">;
