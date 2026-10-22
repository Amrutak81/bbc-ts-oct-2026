type User = {
  id: number;
  name: string;
  email: string;
};

type Admin = User & {
  role: "admin";
  permissions: string[];
  lastLogin: Date;
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
  };
};

type RegularUser = User & {
  role: "user";
  lastActive: Date;
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
  };
};

type ValidUsers = Admin | RegularUser;

function isAdmin(user: ValidUsers): user is Admin {
  return user.role === "admin" && "permissions" in user;
}

function processUser(user: ValidUsers) {
  user;
  if (isAdmin(user)) {
    user;
  }
}
