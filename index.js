import { displayData } from "./scripts/displayData.js";
import { applyTheme } from "./scripts/header.js";

const input = document.getElementById("domTextElement");
const searchButton = document.querySelector(".search__button");

document.addEventListener("DOMContentLoaded", () => {
  searchButton.click();
  applyTheme();
});

const url = "https://api.dictionaryapi.dev/api/v2/entries/en";
async function getApi(value) {
  input.classList.add("loading");
  try {
    const res = await fetch(`${url}/${value || "Hello"}`);
    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    input.classList.remove("loading");
  }
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

searchButton.addEventListener("click", async () => {
  const value = input.value.toLowerCase();
  const data = await getApi(value);
  displayData(data);
});
