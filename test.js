function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
  Product.allProductsArray.push(this);
}

Product.allProductsArray = [];
