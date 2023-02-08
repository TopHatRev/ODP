let totalClicks = 0;
const maxClicks = 10;

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
  Product.allProductsArray.push(this);
}

Product.allProductsArray = [];

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

for (let i = 0; i < productNames.length; i++) {
  new Product(productNames[i], `images/${productNames[i]}.jpeg`);
}

function randomNum() {
  return Math.floor(Math.random() * Product.allProductsArray.length);
}

function renderProducts() {
  let product1 = randomNum();
  let product2 = randomNum();
  let product3 = randomNum();

  while (
    product1 === product2 ||
    product1 === product3 ||
    product2 === product3
  ) {
    product2 = randomNum();
    product3 = randomNum();
  }

  let img1 = document.getElementById("img1");
  let img2 = document.getElementById("img2");
  let img3 = document.getElementById("img3");

  img1.src = Product.allProductsArray[product1].src;
  img1.name = Product.allProductsArray[product1].name;

  img2.src = Product.allProductsArray[product2].src;
  img2.name = Product.allProductsArray[product2].name;

  img3.src = Product.allProductsArray[product3].src;
  img3.name = Product.allProductsArray[product3].name;
}

renderProducts();

function handleClick(event) {
  if (event.target === imgContainer) {
    alert("Nuh uh, click the image you buffoon.");
  } else {
    totalClicks++;
  }
}

const imgContainer = document.getElementById("img-container");
imgContainer.addEventListener("click", handleClick);
