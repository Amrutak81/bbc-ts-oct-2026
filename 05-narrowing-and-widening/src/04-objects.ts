type Apple = {
  type: "apple";
  isGoodForBaking: boolean;
  ripe: boolean;
  color: "red" | "green";
};

type Orange = {
  type: "orange";
  numOfSegments: number;
  ripe: boolean;
};

function pickFruit(fruit: Apple | Orange) {
  fruit;
  if ("isGoodForBaking" in fruit) {
    fruit;
  }
  if (fruit.type === "orange") {
    fruit;
  }
  if ((fruit as Apple).isGoodForBaking) {
    fruit;
  }
}

type LoadingState = {
  status: "loading";
  progress?: number;
};

type SuccessState = {
  status: "success";
  data: { name: string; date: Date }[];
  timestampe: Date;
};

type ErrorState = {
  status: "error";
  error: Error;
  retryable: boolean;
};

type States = LoadingState | SuccessState | ErrorState; // discriminated union

function evaluateState(state: States) {
  state;
  if (
    state.status !== "error" &&
    state.status !== "loading" &&
    state.status !== "success"
  ) {
    throw new Error("invalid state");
  }
  switch (state.status) {
    case "loading":
      state;
      // do some logic
      break;
    case "error":
      state;
      break;
    // do some logic for errors
    case "success":
      state;
      break;
    default:
      state;
      throw new Error("invalid state");
  }
}
