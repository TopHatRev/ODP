function getRandomProductIndex() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

let totalClicks = 0;
const maxClicks = 10;
function Product(name, src, clicks, views) {
  this.name = name;
  this.src = src;
  this.clicks = clicks;
  this.views = views;
  Product.allProducts.push(this);
}

Product.allProducts = [];

const productNames = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];

if (localStorage.getItem("productData") === null) {
  for (let i = 0; i < productData.length; i++) {
    new Product(productData[i], `images/${productData[i]}.jpeg`, 0, 0);
  }
} else {
  const productData = JSON.parse(localStorage.getItem("productData"));

  for (let i = 0; i < productData.length; i++) {
    new Product(
      productData[i].name,
      productData[i].src,
      productData[i].clicks,
      productData[i].views
    );
  }
}

// render our products onto the page
function renderProducts() {
  // get three random product indexes
  let product1 = getRandomProductIndex();
  let product2 = getRandomProductIndex();
  let product3 = getRandomProductIndex();

  // check none of them match
  while (
    product1 === product2 ||
    product1 === product3 ||
    product2 === product3
  ) {
    product2 = getRandomProductIndex();
    product3 = getRandomProductIndex();
  }

  // put those images onto the page
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");

  img1.src = Product.allProducts[product1].src;
  img1.alt = Product.allProducts[product1].name;

  img2.src = Product.allProducts[product2].src;
  img2.alt = Product.allProducts[product2].name;

  img3.src = Product.allProducts[product3].src;
  img3.alt = Product.allProducts[product3].name;

  // increase views for displayed images
  Product.allProducts[product1].views++;
  Product.allProducts[product2].views++;
  Product.allProducts[product3].views++;
}

// listen for clicks on the images
function handleClick(event) {
  // make sure they are clicking on an image and not the container itself
  if (event.target === imgContainer) {
    alert("You've got to click on the image!");
  } else {
    totalClicks++;
  }

  // increase clicks
  for (let i = 0; i < Product.allProducts.length; i++) {
    if (Product.allProducts[i].name === event.target.alt) {
      Product.allProducts[i].clicks++;
      break; // ends the for loop
    }
  }

  // check max clicks
  if (totalClicks === maxClicks) {
    // remove the event listener so the game ends
    imgContainer.removeEventListener("click", handleClick);
    const productsStr = JSON.stringify(Product.allProducts);
    localStorage.setItem("productData", productsStr);
    // maybe rnder results?
    renderChart();
  } else {
    renderProducts();
  }
}

function renderResults() {
  const resultsList = document.getElementById("results-list");

  for (let i = 0; i < Product.allProducts.length; i++) {
    let theProduct = Product.allProducts[i];
    let li = document.createElement("li");
    li.textContent = `${theProduct.name}: ${theProduct.clicks} clicks ${theProduct.views} views`;
    resultsList.appendChild(li);
  }
}

const imgContainer = document.getElementById("img-container");
imgContainer.addEventListener("click", handleClick);

function renderChart() {
  const myChart = document.getElementById("chart");
  let labels = [];
  let viewsData = [];
  let clicksData = [];

  for (let i = 0; i < Product.allProducts.length; i++) {
    labels.push(Product.allProducts[i].name);
    viewsData.push(Product.allProducts[i].views);
    clicksData.push(Product.allProducts[i].clicks);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Views",
        data: viewsData,
        borderWidth: 1,
      },
      {
        label: "# of Votes",
        data: clicksData,
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: "bar",
    data: data,
  };

  new Chart(myChart, config);
}

renderProducts();

function setTheme() {
  if (
    localStorage.getItem("theme") === "light" ||
    localStorage.getItem("theme") === null
  ) {
    localStorage.setItem("theme", "dark");
    document.body.classList.add("dark");
  } else {
    localStorage.setItem("theme", "light");
    document.body.classList.remove("dark");
  }
}

const themeButton = document.getElementById("theme-change");
themeButton.addEventListener("click", setTheme);

function getTheme() {
  theme = localStorage.getItem("theme");
}
setTheme();
