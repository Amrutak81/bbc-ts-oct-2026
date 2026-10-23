function identity<T>(value: T): T {
  return value;
}

const result1 = identity("hello");

function processConfig<const T>(config: T): T {
  return config;
}

const config1 = processConfig({
  apiUrl: "https://api.example.com",
  timeout: 5000,
});

config1;

const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};
