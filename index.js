const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());
app.use(express.json());

function getSortedProductsOnRating(product1, product2) {
  return product2.rating - product1.rating;
}
app.get('/products/sort/popularity', (req, res) => {
  let sortedProducts = products.sort(getSortedProductsOnRating);
  res.json(sortedProducts);
});

function getDescendingProductsOnPrice(product1, product2) {
  return product2.price - product1.price;
}
app.get('/products/sort/price-high-to-low', (req, res) => {
  let sortedProducts = products.sort(getDescendingProductsOnPrice);
  res.json(sortedProducts);
});

function getAscendingProductsOnPrice(product1, product2) {
  return product1.price - product2.price;
}
app.get('/products/sort/price-low-to-high', (req, res) => {
  let sortedProducts = products.sort(getAscendingProductsOnPrice);
  res.json(sortedProducts);
});

function filterByRam(product, ram) {
  return product.ram === ram;
}
app.get('/products/filter/ram', (req, res) => {
  let ram = parseFloat(req.query.ram);

  let filterProductByRam = products.filter((product) =>
    filterByRam(product, ram)
  );
  res.json(filterProductByRam);
});

function filterByRom(product, rom) {
  return product.rom === rom;
}
app.get('/products/filter/rom', (req, res) => {
  let rom = parseFloat(req.query.rom);

  let filterProductByRom = products.filter((product) =>
    filterByRom(product, rom)
  );
  res.json(filterProductByRom);
});

function filterByBrand(product, brand) {
  return product.brand.toLowerCase() === brand.toLowerCase();
}
app.get('/products/filter/brand', (req, res) => {
  let brand = req.query.brand;

  let filterProductByBrand = products.filter((product) =>
    filterByBrand(product, brand)
  );
  res.json(filterProductByBrand);
});

function filterByOs(product, os) {
  return product.os.toLowerCase() === os.toLowerCase();
}
app.get('/products/filter/os', (req, res) => {
  let os = req.query.os;
  let filterProductByOs = products.filter((product) => filterByOs(product, os));

  res.json(filterProductByOs);
});

function filterByPrice(product, price) {
  return product.price === price;
}
app.get('/products/filter/price', (req, res) => {
  let price = parseFloat(req.query.price);
  let filterProductByPrice = products.filter((product) =>
    filterByPrice(product, price)
  );

  res.json(filterProductByPrice);
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
