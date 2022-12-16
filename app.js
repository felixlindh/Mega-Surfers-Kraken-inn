const languageFlag = document.querySelector(".top-flag");
const cardContainer = document.querySelector(".card-container");
const searchIcon = document.querySelector(".top-search");

let currentLanguage = "swedish";

searchIcon.addEventListener("click", () => {
  console.log("search click");
  const div = document.createElement("div");
  div.className = "top-search-screen";
  div.innerHTML = `
  <div class="top-search-screen">
    <img
        class="search-screen-background"
        src="assets/images/icons/scroll.png" />
    <h2 class="search-screen-title">Search and filter</h2>
    <div class="search-screen-filters">
        <p class="filters-options">
            <input class="filters-checkbox" type="checkbox" />
            <span>Barbeques</span>
        </p>
        <p class="filters-options">
            <input class="filters-checkbox" type="checkbox" />
            <span>Desserts</span>
        </p>
        <p class="filters-options">
            <input class="filters-checkbox" type="checkbox" />
            <span>Sandwiches</span>
        </p>
        <p class="filters-options">
            <input class="filters-checkbox" type="checkbox" />
            <span>Beverages</span>
        </p>
    </div>
    <div class="search-screen-user-input">
        <input class="user-input-input" />
        <button class="user-input-search-btn">Search</button>
        </div>
    </div>
  `;
  document.querySelector(".page-header").append(div);
  div.querySelector(".user-input-search-btn").addEventListener("click", () => {
    document.querySelector(".top-search-screen").remove();
  });
});

languageFlag.addEventListener("click", () => {
  const languageDiv = document.createElement("div");
  languageDiv.className = "header-lang-select";
  languageDiv.innerHTML = `
  <h2 class="lang-select-title">Select your language</h2>
    <div class="lang-select-flags">
        <img class="flag-img" src="assets/images/icons/swedish-flag.png" />
        <img class="flag-img" src="assets/images/icons/english-flag.png" />
    </div>
    <img class="lang-select-background" src="assets/images/icons/scroll.png" />
  `;
  setLanguageFunctions(languageDiv);
  document.querySelector(".page-header").append(languageDiv);
});

function setLanguageFunctions(container) {
  const flags = container.querySelectorAll(".flag-img");
  flags[0].addEventListener("click", () => {
    setLanguage("swedish");
    container.remove();
  });
  flags[1].addEventListener("click", () => {
    setLanguage("english");
    container.remove();
  });
}

function setLanguage(language) {
  currentLanguage = language;
  languageFlag.setAttribute("src", `assets/images/icons/${language}-flag.png`);
}

const orderCards = [
  /* bbqs */
  {
    image: `<img src="${db.bbqs[0].img}" alt="food" />` ,
    titel: `<h1>${db.bbqs[0].name}</h1>` ,
    info:  `<p>${db.bbqs[0].dsc}</p>` ,
    price: `<p>${db.bbqs[0].price}$</p>`,
  },
  {
    image: `<img src="${db.bbqs[1].img}" alt="food" />` ,
    titel: `<h1>${db.bbqs[1].name}</h1>` ,
    info:  `<p>${db.bbqs[1].dsc}</p>` ,
    price: `<p>${db.bbqs[1].price}$</p>`,
  },
  {
    image: `<img src="${db.bbqs[2].img}" alt="food" />` ,
    titel: `<h1>${db.bbqs[2].name}</h1>` ,
    info:  `<p>${db.bbqs[2].dsc}</p>` ,
    price: `<p>${db.bbqs[2].price}$</p>`,
  },
  /* sandwitches */
  {
    image: `<img src="${db.sandwiches[0].img}" alt="food" />` ,
    titel: `<h1>${db.sandwiches[0].name}</h1>` ,
    info:  `<p>${db.sandwiches[0].dsc}</p>` ,
    price: `<p>${db.sandwiches[0].price}$</p>`,
  },
];

function generateOrderCards(object) {
  for (let i = 0; i < object.length; i++) {
    let card = document.createElement("article");
    card.className = "card";
    let button = document.createElement("button");
    button.innerHTML = `Order`;
    button.className = "order-button";
    let backgroundImage = document.createElement("img");
    backgroundImage.className = "background-image";
    backgroundImage.src = "/assets/Papper_TP.png";

    card.innerHTML =
      object[i].image + object[i].titel + object[i].info + object[i].price;
    card.querySelector("img").className = "food-image";
    card.append(backgroundImage);
    card.append(button);
    cardContainer.append(card);
  }
}

generateOrderCards(orderCards);
