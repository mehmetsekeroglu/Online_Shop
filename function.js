/*Wiev*/
/**
 * Header elemanini olusturur
 */
function createHeader() {
    return `
  <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand text-light" href="#">
      <img src="https://image.shutterstock.com/image-vector/r-logo-vector-letter-forming-260nw-345010364.jpg" width="30" height="30" class="d-inline-block align-top" alt="">
      Raziye's Online Shop
    </a>
  </nav>`
}
/**
 * Ürün listesini olusturur.
 * @param {Array} pList 
 */
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
/**
 * Alisveris Sepetini Olusturur
 * @param {Array} pShopList 
 */
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
/**
 * Ana yapiyi UI'da görüntüler
 * @param {Array} pList 
 */
function createUI(pList) {
    headerElement.innerHTML = createHeader();
    productElement.innerHTML = createProductList(pList);
}
/**Functions */
/**
 * Alisveris Listesi Arrayini Olusturur
 * @param {*} event 
 */
function createShoppingList(event) {
    productList.filter(product => {
        if (event.target.id === product.productName) {
            shoppingList.push(product);
        }
    })
    return shoppingList
}
/**
 * Ürün silme islemini yapar 
 * @param {*} event 
 */
function deleteProduct(event) {
    shoppingList.map((product, index) => {
        if (event.target.id === `delete-${index}`) {
            const productIndex = shoppingList.indexOf(product);
            shoppingList.splice(productIndex, 1);
            shoppingElement.innerHTML = showShoppingBox(shoppingList);
        }
    })
}

/**Data Model */

/**
 * Alisveris sepetine ürün ekler
 */
function addProduct() {
    productList.map(product => {
        document.querySelector(`#${product.productName}`).addEventListener("click", (event) => {
            createShoppingList(event)
            shoppingElement.innerHTML = showShoppingBox(shoppingList);
        })
    })
}
/**
 * Silinen ürünü DOM'dan kaldirir
 */
function deleteProductEvent() {
    document.querySelector(".shopping-box").addEventListener("click", (event) => {
        if (event.target.className === 'delete btn btn-secondary') {
            deleteProduct(event);
        }
    })
}

/**Initialization */
function start() {
    createUI(productList);
    addProduct();
    deleteProductEvent();
}