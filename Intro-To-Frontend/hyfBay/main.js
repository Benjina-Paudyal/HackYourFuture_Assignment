console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);

const productList = document.querySelector("#productList");

function renderProducts(products) {
  productList.innerHTML = "";

  products.forEach(function (product) {
    const li = document.createElement("li");

    li.innerHTML = `
    <strong>Product:</strong> ${product.name}<br>
    <strong>Price:</strong> $${product.price} <br>
    <strong>Rating:</strong> ${product.rating}
    `;

    productList.appendChild(li);
  });
}

renderProducts(products);
