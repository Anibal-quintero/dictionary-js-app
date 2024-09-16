const headerSelect = document.querySelector(".header__select");
const headerFamily = document.querySelector(".header__family");
const headerOption = document.querySelector(".header__option");
const downArrow = document.querySelector(".down__arrow");
const headerToogle = document.querySelector(".header__toggle");
const themeIcon = document.querySelector(".theme-icon")

let showFontOptions = false;

headerSelect.addEventListener("click", () => {
  showFontOptions = !showFontOptions;
  headerOption.style.visibility = showFontOptions ? "visible" : "hidden";
  downArrow.style.transform = showFontOptions ? "rotate(0)" : "rotate(180deg)";
});

export function applyTheme() {
  const theme = headerToogle.checked ? "dark" : "light";
  themeIcon.src = headerToogle.checked ? "/assets/moon.svg" : "/assets/sun.svg"
  document.documentElement.setAttribute("data-theme", theme);
}

headerToogle.addEventListener("change", applyTheme);

const buttons = document.querySelectorAll(".header__option button");
const body = document.body;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    body.classList.remove("sans-serif", "serif", "monospace");
    const selectedFont = button.getAttribute("data-font");
    body.classList.add(selectedFont);
    headerFamily.innerHTML = button.getAttribute("data-font");
    headerSelect.click();
  });
});
body.classList.add("sans-serif");
