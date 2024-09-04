const headerSelect = document.querySelector(".header__select");
const headerFamily = document.querySelector(".header__family");
const headerOption = document.querySelector(".header__option");
const downArrow = document.querySelector(".down__arrow");
const headerToogle = document.querySelector(".header__toogle");

let hidden = false;

headerSelect.addEventListener("click", () => {
  hidden = !hidden;
  headerOption.style.visibility = hidden ? "visible" : "hidden";
  downArrow.style.transform = hidden ? "rotate(0)" : "rotate(180deg)";
});

function applyTheme() {
  const theme = headerToogle.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
}

applyTheme();

headerToogle.addEventListener("change", applyTheme);

const buttons = document.querySelectorAll(".header__option button");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    document.body.style.fontFamily = this.getAttribute("data-font");
    headerFamily.innerHTML = this.getAttribute("data-font");
  });
});
