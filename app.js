const languageFlag = document.querySelector(".top-flag");
const cardContainer = document.querySelector(".card-container");
const searchIcon = document.querySelector(".top-search");
const navList = document.querySelector(".nav-list");
const orderAmount = document.querySelector(".amount-text");
const topCart = document.querySelector(".top-cart");
const featuredBtn = document.querySelector(".featured-btn");

let currentLanguage = "swedish";
let currentCategory = "highlights";
const categorys = ["highlights", "bbqs", "desserts", "sandwiches", "drinks"];
const orderedItems = [];

searchIcon.addEventListener("click", () => {
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
            <input id="barbeques" class="filters-checkbox" type="checkbox" />
            <span>Barbeques</span>
        </p>
        <p class="filters-options">
            <input id="desserts" class="filters-checkbox" type="checkbox" />
            <span>Desserts</span>
        </p>
        <p class="filters-options">
            <input id="sandwiches" class="filters-checkbox" type="checkbox" />
            <span>Sandwiches</span>
        </p>
        <p class="filters-options">
            <input id="beverages" class="filters-checkbox" type="checkbox" />
            <span>Drinks</span>
        </p>
    </div>
    <div class="search-screen-user-input">
        <input class="user-input-input" />
        <button class="user-input-search-btn">Search</button>
        </div>
    </div>
  `;

  document.querySelector(".page-header").append(div);
  swapLanguageSearch();
  div.querySelector(".user-input-search-btn").addEventListener("click", () => {
    filterFoods();
  });
});

function filterFoods() {
  const bbqInput = document.querySelector("#barbeques");
  const dessertInput = document.querySelector("#desserts");
  const sandwichInput = document.querySelector("#sandwiches");
  const beveragesInput = document.querySelector("#beverages");
  const userInput = document.querySelector(".user-input-input");
  const filterArray = [bbqInput, dessertInput, sandwichInput, beveragesInput];
  cardContainer.innerHTML = "";
  let noFilterTicked = true;
  for (let i = 0; i < filterArray.length; i++) {
    if (filterArray[i].checked == true) {
      noFilterTicked = false;
      setCategoryTitle(i + 1);
      let items = searchFoods(userInput.value, orderCards[currentCategory]);
      items.length > 0 && generateOrderCards(items);
    }
  }
  if (noFilterTicked) {
    for (let i = 1; i < categorys.length; i++) {
      let items = searchFoods(userInput.value, orderCards[categorys[i]]);
      if (items.length > 0) {
        setCategoryTitle(i);
        generateOrderCards(items);
      }
    }
  }
  document.querySelector(".top-search-screen").remove();
  cardContainer.innerHTML == "" && onNoItemsFound();
}

function searchFoods(searchQuery, list) {
  let items = list,
    newSearchQuery = searchQuery.toLowerCase();
  if (searchQuery != "") {
    items = items.filter(
      (item) =>
        item.titel.toLowerCase().includes(newSearchQuery) ||
        item.info.toLowerCase().includes(newSearchQuery)
    );
  }
  return items;
}

function onNoItemsFound() {
  cardContainer.innerHTML = `
  <article class="card">
  <img src="assets/images/icons/scroll.png" class="background-image"/>
    <h1 id="no-items-found-text" style="width: 75%">${
      currentLanguage == "swedish"
        ? "Hittade inte det du sökte efter"
        : "Could not find what you were looking for"
    }</h1>
  </article>
  `;
}

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
  swapSelectLanguageTitle();
});

function swapSelectLanguageTitle() {
  const title = document.querySelector(".lang-select-title");

  if (currentLanguage == "swedish") {
    title.innerText = "Välj ditt språk";
  }
}

function onOrderClick(event) {
  const card = event.currentTarget.parentElement;
  const confirmPage = document.createElement("div");
  confirmPage.className = "confirm-page";
  confirmPage.innerHTML = `
  <img class="confirm-background" src="assets/images/icons/scroll.png"/>
  <h2 class="confirm-title">${
    currentLanguage == "swedish" ? "Är du säker?" : "Are you sure?"
  }</h2>
  <p class="confirm-food">
  ${
    currentLanguage == "swedish"
      ? "Vill du beställa:"
      : "Do you want to order: "
  }</p>
  <p class="confirm-food">
  ${card.querySelector("h1").textContent}?
  </p>
  <button class="confirm-btn">${
    currentLanguage == "swedish" ? "Ja" : "Yes"
  }</button>
  <button class="confirm-btn">${
    currentLanguage == "swedish" ? "Nej" : "No"
  }</button>
  `;
  const buttons = confirmPage.querySelectorAll("button");
  buttons[0].addEventListener("click", () => {
    addOrderToTab(card);
    confirmPage.remove();
  });
  buttons[1].addEventListener("click", () => {
    confirmPage.remove();
  });
  cardContainer.append(confirmPage);
}

function addOrderToTab(card) {
  const title = card.querySelector("h1").textContent;
  const check = orderedItems.find((item) => item.title == title);
  if (check != undefined) {
    check.quantity++;
    document.getElementById(check.title).querySelector(".count").textContent =
      check.quantity;
  } else {
    const imgUrl = card.querySelector(".food-image").src;
    const price = card.querySelectorAll("p")[1].textContent;
    const quantity = 1;
    orderedItems.push({
      img: imgUrl,
      title: title,
      price: price,
      quantity: quantity,
    });
    //Skapar element till kvitto item
    const receiptItem = document.createElement("article");
    let itemImg = document.createElement("img");
    let itemTitle = document.createElement("h1");
    let itemCount = document.createElement("div");
    let itemPrice = document.createElement("div");
    let insidePaper = document.querySelector(".inside-paper");

    //Ger classer till alla kvitto item
    receiptItem.classList.add("cart-items");
    receiptItem.id = orderedItems[orderedItems.length - 1].title;
    itemImg.classList.add("item-img");
    itemImg.setAttribute("src", orderedItems[orderedItems.length - 1].img);
    itemTitle.classList.add("title");

    itemCount.classList.add("count");
    itemPrice.classList.add("price");

    itemTitle.textContent = orderedItems[orderedItems.length - 1].title;
    itemCount.textContent = orderedItems[orderedItems.length - 1].quantity;
    itemPrice.textContent = orderedItems[orderedItems.length - 1].price;

    insidePaper.firstChild.before(receiptItem);
    receiptItem.append(itemImg, itemTitle, itemCount, itemPrice);
  }
  let amountItem = document.querySelector(".item-amount");
  console.log(amountItem);
  let amountPrice = document.querySelector(".total-amount");
  amountPrice.textContent =
    calculateTotalPrice(orderedItems).toFixed(2) + " Sek";

  setTotalItemAmount(orderedItems, amountItem);
  orderAmount.textContent = Number(orderAmount.textContent) + 1;
}

function calculateTotalPrice(orderedItems) {
  let priceSum = 0;

  for (let i = 0; i < orderedItems.length; i++) {
    for (let j = 0; j < orderedItems[i].quantity; j++) {
      let priceText = orderedItems[i].price.slice(
        0,
        orderedItems[i].price.length - 3
      );
      priceSum += Number(priceText);
    }
  }
  return priceSum;
}

function setTotalItemAmount(orderedItems, amountItem) {
  let count = 0;
  for (let i = 0; i < orderedItems.length; i++) {
    count += orderedItems[i].quantity;
  }

  amountItem.textContent = `${count}`;
}

function setLanguageFunctions(container) {
  const flags = container.querySelectorAll(".flag-img");
  flags[0].addEventListener("click", () => {
    setLanguage("swedish");
    setNavLanguage();
    swapLanguageButtons();
    swapCategoryLanguage();
    let itemsNotFound = document.getElementById("no-items-found-text");
    if (itemsNotFound != null) {
      itemsNotFound.textContent = "Hittade inte det du sökte efter";
    }
    container.remove();
  });
  flags[1].addEventListener("click", () => {
    setLanguage("english");
    setNavLanguage();
    swapLanguageButtons();
    swapCategoryLanguage();
    let itemsNotFound = document.getElementById("no-items-found-text");
    if (itemsNotFound != null) {
      itemsNotFound.textContent = "Could not find what you were looking for";
    }
    container.remove();
  });
}

function setNavLanguage() {
  const p = navList.querySelectorAll("p");
  p[0].textContent =
    currentLanguage == "swedish" ? "Höjdpunkter" : "Highlights";
  p[2].textContent = currentLanguage == "swedish" ? "Efterätter" : "Desserts";
  p[3].textContent = currentLanguage == "swedish" ? "Smörgåsar" : "Sandwiches";
  p[4].textContent = currentLanguage == "swedish" ? "Drycker" : "Drinks";
}

function setLanguage(language) {
  currentLanguage = language;
  languageFlag.setAttribute("src", `assets/images/icons/${language}-flag.png`);
}

function swapLanguageSearch() {
  const headerSearch = document.querySelector(".search-screen-title");
  const spanContainer = document.querySelector(".search-screen-filters");
  const spans = spanContainer.querySelectorAll("span");
  const searchButton = document.querySelector(".user-input-search-btn");

  if (currentLanguage == "swedish") {
    headerSearch.innerText = "Sök och filtrera";
    spans[0].innerText = "Barbeques";
    spans[1].innerText = "Efterätter";
    spans[2].innerText = "Smörgåsar";
    spans[3].innerText = "Drycker";
    searchButton.innerText = "Sök";
  } else if (currentLanguage == "english") {
    headerSearch.innerText = "Search and filter";
    spans[0].innerText = "Barbeques";
    spans[1].innerText = "Desserts";
    spans[2].innerText = "Sandwiches";
    spans[3].innerText = "Drinks";
    searchButton.innerText = "Search";
  }
}
function swapLanguageReceit() {
  const receitHeader = document.querySelector(".heading");
  const totalCost = document.querySelector(".subtotal");
  const itemAmount = document.querySelector(".items");
  if (currentLanguage == "swedish") {
    receitHeader.innerText = "Din nota";
    totalCost.innerText = "Total konstnad";
    itemAmount.innerHTML = 'Varor: <span class="item-amount"> </span>';
  } else if (currentLanguage == "english") {
    receitHeader.innerText = "Your tab";
    totalCost.innerText = "Total cost";
    itemAmount.innerHTML = 'Items: <span class="item-amount"> </span>';
  }
  let amountItem = document.querySelector(".item-amount");
  setTotalItemAmount(orderedItems, amountItem);
}

function swapLanguageButtons() {
  const orderButtons = document.querySelectorAll(".order-button");

  if (currentLanguage == "swedish") {
    orderButtons.forEach((button) => {
      button.innerText = "Beställ";
    });
  } else if (currentLanguage == "english") {
    orderButtons.forEach((button) => {
      button.innerText = "Order";
    });
  }
}

const orderCards = {
  highlights: [
    {
      image: `<img src="${db.bbqs[0].img}" alt="food" />`,
      titel: `<h1>${db.bbqs[0].name}</h1>`,
      info: `<p>${db.bbqs[0].dsc}</p>`,
      price: `<p>${db.bbqs[0].price}Sek</p>`,
    },
    {
      image: `<img src="${db.sandwiches[1].img}" alt="food" />`,
      titel: `<h1>${db.sandwiches[1].name}</h1>`,
      info: `<p>${db.sandwiches[1].dsc}</p>`,
      price: `<p>${db.sandwiches[1].price}Sek</p>`,
    },
    {
      image: `<img src="${db.desserts[0].img}" alt="food" />`,
      titel: `<h1>${db.desserts[0].name}</h1>`,
      info: `<p>${db.desserts[0].dsc}</p>`,
      price: `<p>${db.desserts[0].price}Sek</p>`,
    },
    {
      image: `<img src="${db.drinks[1].img}" alt="food" />`,
      titel: `<h1>${db.drinks[1].name}</h1>`,
      info: `<p>${db.drinks[1].dsc}</p>`,
      price: `<p>${db.drinks[1].price}Sek</p>`,
    },
  ],
  bbqs: [
    {
      image: `<img src="${db.bbqs[0].img}" alt="food" />`,
      titel: `<h1>${db.bbqs[0].name}</h1>`,
      info: `<p>${db.bbqs[0].dsc}</p>`,
      price: `<p>${db.bbqs[0].price}Sek</p>`,
    },
    {
      image: `<img src="${db.bbqs[1].img}" alt="food" />`,
      titel: `<h1>${db.bbqs[1].name}</h1>`,
      info: `<p>${db.bbqs[1].dsc}</p>`,
      price: `<p>${db.bbqs[1].price}Sek</p>`,
    },
    {
      image: `<img src="${db.bbqs[2].img}" alt="food" />`,
      titel: `<h1>${db.bbqs[2].name}</h1>`,
      info: `<p>${db.bbqs[2].dsc}</p>`,
      price: `<p>${db.bbqs[2].price}Sek</p>`,
    },
  ],
  sandwiches: [
    {
      image: `<img src="${db.sandwiches[0].img}" alt="food" />`,
      titel: `<h1>${db.sandwiches[0].name}</h1>`,
      info: `<p>${db.sandwiches[0].dsc}</p>`,
      price: `<p>${db.sandwiches[0].price}Sek</p>`,
    },
    {
      image: `<img src="${db.sandwiches[1].img}" alt="food" />`,
      titel: `<h1>${db.sandwiches[1].name}</h1>`,
      info: `<p>${db.sandwiches[1].dsc}</p>`,
      price: `<p>${db.sandwiches[1].price}Sek</p>`,
    },
    {
      image: `<img src="${db.sandwiches[2].img}" alt="food" />`,
      titel: `<h1>${db.sandwiches[2].name}</h1>`,
      info: `<p>${db.sandwiches[2].dsc}</p>`,
      price: `<p>${db.sandwiches[2].price}Sek</p>`,
    },
  ],
  desserts: [
    {
      image: `<img src="${db.desserts[0].img}" alt="food" />`,
      titel: `<h1>${db.desserts[0].name}</h1>`,
      info: `<p>${db.desserts[0].dsc}</p>`,
      price: `<p>${db.desserts[0].price}Sek</p>`,
    },
    {
      image: `<img src="${db.desserts[1].img}" alt="food" />`,
      titel: `<h1>${db.desserts[1].name}</h1>`,
      info: `<p>${db.desserts[1].dsc}</p>`,
      price: `<p>${db.desserts[1].price}Sek</p>`,
    },
    {
      image: `<img src="${db.desserts[2].img}" alt="food" />`,
      titel: `<h1>${db.desserts[2].name}</h1>`,
      info: `<p>${db.desserts[2].dsc}</p>`,
      price: `<p>${db.desserts[2].price}Sek</p>`,
    },
  ],
  drinks: [
    {
      image: `<img src="${db.drinks[0].img}" alt="food" />`,
      titel: `<h1>${db.drinks[0].name}</h1>`,
      info: `<p>${db.drinks[0].dsc}</p>`,
      price: `<p>${db.drinks[0].price}Sek</p>`,
    },
    {
      image: `<img src="${db.drinks[1].img}" alt="food" />`,
      titel: `<h1>${db.drinks[1].name}</h1>`,
      info: `<p>${db.drinks[1].dsc}</p>`,
      price: `<p>${db.drinks[1].price}Sek</p>`,
    },
    {
      image: `<img src="${db.drinks[2].img}" alt="food" />`,
      titel: `<h1>${db.drinks[2].name}</h1>`,
      info: `<p>${db.drinks[2].dsc}</p>`,
      price: `<p>${db.drinks[2].price}Sek</p>`,
    },
  ],
};

function generateOrderCards(object) {
  for (let i = 0; i < object.length; i++) {
    const foods = object;
    let card = document.createElement("article");
    card.className = "card";
    let button = document.createElement("button");
    button.innerHTML = `Order`;
    button.className = "order-button";
    button.addEventListener("click", onOrderClick);
    let backgroundImage = document.createElement("img");
    backgroundImage.className = "background-image";
    backgroundImage.src = "assets/Papper_TP.png";
    let infoContainer = document.createElement("div");
    infoContainer.className = "info-container";
    card.innerHTML = foods[i].image;
    infoContainer.innerHTML = foods[i].titel + foods[i].info + foods[i].price;
    card.querySelector("img").className = "food-image";
    card.append(backgroundImage);
    card.append(infoContainer);
    card.append(button);
    cardContainer.append(card);
    cardContainer.classList.add("slide-container");
    setTimeout(() => {
      cardContainer.classList.remove("slide-container");
    }, 1000);
    swapLanguageButtons();
  }
  if (currentCategory == "highlights") {
    createCaptainJack();
  }
}

function createCaptainJack() {
  const jackContainer = document.createElement("div");
  jackContainer.classList.add("jack-container");
  jackContainer.innerHTML = `<img class="pistol1" src="assets/images/icons/pistol.png" alt="" />
  <img
    class="jack-sparrow-img"
    src="assets/images/icons/captain.png"
    alt="" />
  <img class="pistol2" src="assets/images/icons/pistol.png" alt="" />`;
  cardContainer.childNodes[0].before(jackContainer);
}

function setCategoryTitle(index) {
  currentCategory = categorys[index];
  const titleContainer = document.createElement("div");
  titleContainer.className = "container-category";
  titleContainer.innerHTML = `
    <img class="category-background" src="assets/images/icons/scroll.png" />
    <h2 class="category-title">${
      currentCategory[0].toUpperCase() +
      currentCategory.slice(1, currentCategory.length)
    }</h2>
  `;

  cardContainer.append(titleContainer);
  swapCategoryLanguage();
}

function swapCategoryLanguage() {
  const titles = document.querySelectorAll(".category-title");

  titles.forEach((title) => {
    if (currentLanguage == "swedish") {
      if (title.innerHTML == "Desserts") {
        title.innerText = "Efterätter";
      }
      if (title.innerHTML == "Sandwiches") {
        title.innerText = "Smörgåsar";
      }
      if (title.innerHTML == "Highlights") {
        title.innerText = "Höjdpunkter";
      }
      if (title.innerHTML == "Drinks") {
        title.innerText = "Drycker";
      }
    } else if (currentLanguage == "english") {
      if (title.innerHTML == "Efterätter") {
        title.innerText = "Desserts";
      }
      if (title.innerHTML == "Smörgåsar") {
        title.innerText = "Sandwiches";
      }
      if (title.innerHTML == "Höjdpunkter") {
        title.innerText = "Highlights";
      }
      if (title.innerHTML == "Drycker") {
        title.innerText = "Drinks";
      }
    }
  });
}

(() => {
  for (let i = 0; i < navList.children.length; i++) {
    navList.children[i].addEventListener("click", () => {
      cardContainer.classList.toggle("fade");
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      setTimeout(() => {
        cardContainer.innerHTML = "";
        setCategoryTitle(i);
        generateOrderCards(orderCards[currentCategory]);
        cardContainer.classList.toggle("fade");
      }, 250);
    });
  }
})();

function showReceipt() {
  const receit = document.querySelector(".cart-container");

  topCart.addEventListener("click", () => {
    swapLanguageReceit();
    cardContainer.addEventListener("click", () => {
      receit.classList.remove("show");
    });
    if (receit.classList.contains("show")) {
      receit.classList.remove("show");
    } else {
      receit.classList.add("show");
    }
  });
}

showReceipt();

setCategoryTitle(0);
generateOrderCards(orderCards[currentCategory]);
