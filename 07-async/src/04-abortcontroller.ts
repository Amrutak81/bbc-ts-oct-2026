const ac = new AbortController();

async function run(signal: AbortSignal) {
  try {
    const response = await fetch(
      "https://api.github.com/users/doingandlearning",
      { signal },
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
}

Promise.race([run(ac.signal), run(ac.signal), run(ac.signal)]).then(() => {
  ac.abort();
});
