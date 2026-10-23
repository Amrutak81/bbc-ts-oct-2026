export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `Count is currently ${counter}`;
  };
  element.addEventListener("click", () => setCounter(counter + 1));
  setCounter(10);
}
