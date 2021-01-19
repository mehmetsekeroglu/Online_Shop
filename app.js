const productList = [{
    productName: "Aprikosen",
    price: 7.90,
    expireDate: new Date(2021, 11, 12),
    productImage: "https://image.migros.ch/product-zoom/47c42ac7c3f96779711c07b4e887fa314f7d3118/extra-konfituere-aprikosen.jpg",
    totalCalories: 460,
  },
  {
    productName: "Waldbeeren",
    price: 5.20,
    expireDate: new Date(2021, 3, 19),
    productImage: "https://image.migros.ch/product-zoom/b1efd55d4b123bdfdb9e5dd644aed4a472a52e21/favorit-konfituere-waldbeeren.jpg",
    totalCalories: 240
  },
  {
    productName: "Hagenbutten",
    price: 3.10,
    expireDate: new Date(2021, 5, 15),
    productImage: "https://image.migros.ch/product-zoom/7155c76b6f1134f6a57795ded7c1fb8c80953cf7/extra-konfituere-hagenbutten.jpg",
    totalCalories: 300
  },
  {
    productName: "Himbeeren",
    price: 10,
    expireDate: new Date(2021, 8, 17),
    productImage: "https://image.migros.ch/product-zoom/fb3e595303aa4bb287c274b6b0bc7e7c020f80e7/extra-konfituere-himbeeren.jpg",
    totalCalories: 600
  },
  {
    productName: "Kirschen",
    price: 13.70,
    expireDate: new Date(2021, 10, 11),
    productImage: "https://image.migros.ch/product-zoom/2d4a9cc209dcb269be4b805fbf139207c78dc8a4/favorit-konfituere-schwarze-kirschen.jpg",
    totalCalories: 125,
  },
  {
    productName: "Orangen",
    price: 8.90,
    expireDate: new Date(2021, 6, 18),
    productImage: "https://image.migros.ch/product-zoom/cfb4e6683236afcefe918e3e5c273dfb2718ea64/extra-marmelade-bitterorangen.jpg",
    totalCalories: 150
  },
  {
    productName: "Erdbeeren",
    price: 11.90,
    expireDate: new Date(2021, 10, 1),
    productImage: "https://image.migros.ch/product-zoom/c88b57754e8e31309bf45015a0535ed59c05e02c/m-budget-konfituere-erdbeer.jpg",
    totalCalories: 222
  },
  {
    productName: "Erdbeer-Extra",
    price: 4.80,
    expireDate: new Date(2021, 2, 14),
    productImage: "https://image.migros.ch/product-zoom/36b67f0227f055314b9ace8fe2daa24e2279c079/extra-konfituere-erdbeeren.jpg",
    totalCalories: 333
  },
  {
    productName: "Erdbeer-Klein",
    price: 19.50,
    expireDate: new Date(2021, 0, 1),
    productImage: "https://image.migros.ch/product-zoom/023deb389cae5f7f523d2560f5f90f0ee49b8f38/favorit-konfituere-erdbeeren.jpg",
    totalCalories: 250
  }
]

const headerElement = document.querySelector("#nav-header");
const productElement = document.querySelector("#product-list");
const shoppingElement = document.querySelector(".shopping-box");
let shoppingList = []

function createHeader() {
  return `
<nav class="navbar navbar-dark bg-dark">
  <a class="navbar-brand text-light" href="#">
    <img src="https://image.shutterstock.com/image-vector/r-logo-vector-letter-forming-260nw-345010364.jpg" width="30" height="30" class="d-inline-block align-top" alt="">
    Raziye's Online Shop
  </a>
</nav>`
}

function createProductList(pList) {
  let productTable = " "
  productTable = `
<h2>Product List</h2>
<table class="table">
  <thead>
      <tr>
          <th scope="col">Name</th>
          <th scope="col">Calori</th>
          <th scope="col">EXP</th>
          <th scope="col">Price</th>
          <th scope="col">Product</th>
          <th scope="col"></th>
      </tr>
  </thead>
  <tbody>`
  pList.map(product => {
    productTable +=
      `<tr>
      <td><strong>${product.productName}<strong></td>
      <td>${product.totalCalories}</td>
      <td>${product.expireDate}</td>
      <td>${product.price}</td>
      <td><img src="${product.productImage}" width=40px></img></td>
      <td><button id="${product.productName}" type="button" class="btn btn-secondary">Buy</button></td>
    </tr>`
  })
  productTable +=
    `</tbody>
                </table>`
  return productTable
}

function createUI(pList) {
  headerElement.innerHTML = createHeader();
  productElement.innerHTML = createProductList(pList);
}

function createShoppingList(event) {
  productList.filter(product => {
    if (event.target.id === product.productName) {
      shoppingList.push(product);
    }
  })
  return shoppingList
}

function showShoppingBox(pShopList) {
  let totalPrice = 0;
  let shoppingTable = " "
  shoppingTable = `
<h2>Shopping Box</h2>
<table class="table">
  <thead>
      <tr>
          <th scope="col">Name</th>
          <th scope="col">Calori</th>
          <th scope="col">Price</th>
          <th scope="col">Product</th>
          <th scope="col"></th>
      </tr>
  </thead>
  <tbody>`
  pShopList.map((product, index) => {
    totalPrice += product.price;
    shoppingTable +=
      `<tr class="sil">
      <td><strong>${product.productName}<strong></td>
      <td>${product.totalCalories}</td>
      <td>${product.price}</td>
      <td><img src="${product.productImage}" width=50px></img></td>
      <td><button id="delete-${index}" type="button" class="delete btn btn-secondary">Delete</button></td>
  </tr>`
  })
  shoppingTable +=
    `<tr>
<td><strong>Total Price<strong></td>
<td id="total-price">${totalPrice.toFixed(2)}</td>
</tr> 
  </tbody>
  </table>`
  return shoppingTable
}

function addProduct() {
  productList.map(product => {
    document.querySelector(`#${product.productName}`).addEventListener("click", (event) => {
      createShoppingList(event)
      shoppingElement.innerHTML = showShoppingBox(shoppingList);
    })
  })
}

function deleteProduct(event) {
  shoppingList.map((product, index) => {
    if (event.target.id === `delete-${index}`) {
      const productIndex = shoppingList.indexOf(product);
      shoppingList.splice(productIndex, 1);
      shoppingElement.innerHTML = showShoppingBox(shoppingList);
    }
  })
}

function deleteProductEvent() {
  document.querySelector(".shopping-box").addEventListener("click", (event) => {
    if (event.target.className === 'delete btn btn-secondary') {
      deleteProduct(event)
    }
  })
}

createUI(productList);
addProduct();
deleteProductEvent();