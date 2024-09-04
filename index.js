import { displayData } from "./scripts/displayData.js";
import { getApi } from "./scripts/getApi.js";

const input = document.getElementById("domTextElement");
const searchButton = document.querySelector(".search__button");

document.addEventListener("DOMContentLoaded", () => {
  searchButton.click();
});

searchButton.addEventListener("click", async () => {
  const value = input.value;
  const data = await getApi(value); 
  displayData(data);
});
