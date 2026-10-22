// <div id="header">News Stories</div>

const elem = document.getElementById("header");

elem?.innerText || "No header found";

elem!.innerText; // I've got this!  !important

if (elem) {
  elem.innerText;
}

if (!elem) {
  throw new Error("Element not found.");
}

elem.innerText;
