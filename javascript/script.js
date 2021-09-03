let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "Velvet CeramicA",
    tag: "velvetceramica",
    price: 25,
    inCart: 0,
    stock: 5,
  },
  {
    name: "Velvet CeramicB",
    tag: "velvetceramicb",
    price: 25,
    inCart: 0,
    stock: 5,
  },
  {
    name: "Velvet CeramicC",
    tag: "velvetceramicc",
    price: 25,
    inCart: 0,
    stock: 5,
  },
  {
    name: "Velvet CeramicD",
    tag: "velvetceramicd",
    price: 30,
    inCart: 0,
    stock: 5,
  },
  {
    name: "Velvet CeramicE",
    tag: "velvetceramice",
    price: 30,
    inCart: 0,
    stock: 5,
  },
  {
    name: "Velvet CeramicF",
    tag: "velvevtceramicf",
    price: 30,
    inCart: 0,
    stock: 5,
  },
  {
    name: "Velvet CeramicG",
    tag: "velvetceramicg",
    price: 35,
    inCart: 0,
    stock: 5,
  },
  {
    name: "Velvet CeramicH",
    tag: "velvetceramich",
    price: 35,
    inCart: 0,
    stock: 5,
  },
  {
    name: "Velvet CeramicI",
    tag: "velvetceramici",
    price: 40,
    inCart: 0,
    stock: 5,
  },
];

// whenever we click we add the cart span and totalcost
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
    location.reload();
  });
}

/// add number to span
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

// add number from local storage and parse string into integer as well products (key value )
function cartNumbers(product, action) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (action == "decrease") {
    localStorage.setItem("cartNumbers", productNumbers - 1);
    document.querySelector(".cart span").textContent = productNumbers - 1;
  } else if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product, action) {
  //console.log("the product price is", product.price);
  let cartCost = localStorage.getItem("totalCost");

  console.log("My cartCost is", cartCost);
  console.log(typeof cartCost);
  if (action == "decrease") {
    cartCost = parseInt(cartCost);

    localStorage.setItem("totalCost", cartCost - product.price);
  } else if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }

  // localStorage.setItem("totalCost", product.price);
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let cart = localStorage.getItem("totalCost");
  cart = parseInt(cart);

  let productContainer = document.querySelector(".popup-container");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item, index) => {
      productContainer.innerHTML += `<div class="cart-wrap"><div class="product">
                <ion-icon class="close-circle" name="close-circle"></ion-icon>
                    <img src="../images/${item.tag}.jpg"/>
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">$${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease" name="arrow-back-circle-outline"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-forward-circle-outline"></ion-icon>   
            </div>
            <div class="total">$${item.inCart * item.price},00</div></div>`;
    });

    productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">$${cart},00</h4>
                <button class="basket-btn">Check Out</button>
            </div>`;
  }
  deleteButtons();
  manageQuantity();
}

function deleteButtons() {
  let deleteButtons = document.querySelectorAll(".product ion-icon");
  let productName;
  let productNumbers = localStorage.getItem("cartNumbers");
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem("totalCost");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {
      productName = deleteButtons[i].parentElement.textContent
        .toLowerCase()
        .replace(/ /g, "")
        .trim();
      localStorage.setItem(
        "cartNumbers",
        productNumbers - cartItems[productName].inCart
      );

      localStorage.setItem(
        "totalCost",
        cartCost - cartItems[productName].price * cartItems[productName].inCart
      );

      delete cartItems[productName];
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));

      displayCart();
      onLoadCartNumbers();
    });
  }
}

function manageQuantity() {
  let decreaseButtons = document.querySelectorAll(".decrease");
  let increaseButtons = document.querySelectorAll(".increase");
  let cartItems = localStorage.getItem("productsInCart");
  let currentQuantity = 0;
  let currentProduct = "";
  cartItems = JSON.parse(cartItems);

  for (let i = 0; i < decreaseButtons.length; i++) {
    decreaseButtons[i].addEventListener("click", () => {
      currentQuantity =
        decreaseButtons[i].parentElement.querySelector("span").textContent;
      console.log(currentQuantity);
      currentProduct = decreaseButtons[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLowerCase()
        .replace(/ /g, "")
        .trim();
      console.log(currentProduct);

      if (cartItems[currentProduct].inCart > 1) {
        cartItems[currentProduct].inCart -= 1;
        cartNumbers(cartItems[currentProduct], "decrease");
        totalCost(cartItems[currentProduct], "decrease");
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        displayCart();
      }
    });
  }

  for (let i = 0; i < increaseButtons.length; i++) {
    increaseButtons[i].addEventListener("click", () => {
      console.log("increase");
      currentQuantity =
        increaseButtons[i].parentElement.querySelector("span").textContent;
      console.log(currentQuantity);

      currentProduct = decreaseButtons[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLowerCase()
        .replace(/ /g, "")
        .trim();
      console.log(currentProduct);

      cartItems[currentProduct].inCart += 1;
      cartNumbers(cartItems[currentProduct]);
      totalCost(cartItems[currentProduct]);
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      displayCart();
    });
  }
}

onLoadCartNumbers();
displayCart();
