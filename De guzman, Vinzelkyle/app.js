let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let ListCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

// INTEGRATED DATA (Removed requirement for products.json)
let listProduct = [
  { "id": 1, "name": "SEVENTEEN SCOUPS", "price": 150, "image": "puge.jpg" },
  { "id": 2, "name": "SEVENTEEN MINGYU", "price": 200, "image": "gyu.jpg" },
  { "id": 3, "name": "SEVENTEEN JEONGHAN", "price": 200, "image": "han.jpg" },
  { "id": 4, "name": "SEVENTEEN MINGHAO", "price": 200, "image": "hao.jpg" },
  { "id": 5, "name": "TWICE MOMO", "price": 180, "image": "momo.jpg" },
  { "id": 6, "name": "TWICE NAYEON", "price": 180, "image": "nayeon.jpg" },
  { "id": 7, "name": "TWICE SANA", "price": 200, "image": "sana.jpg" },
  { "id": 8, "name": "TWICE TZUYU", "price": 150, "image": "tzuyu.jpg" },
  { "id": 9, "name": "LESSERAFIM CHAEWON", "price": 150, "image": "chae.jpg" },
  { "id": 10, "name": "LESSERAFIM SAKURA", "price": 150, "image": "kura.jpg" },
  { "id": 11, "name": "LESSERAFIM EUNCHAE", "price": 150, "image": "eunchae.jpg" },
  { "id": 12, "name": "LESSERAFIM KAZUHA", "price": 150, "image": "zuha.jpg" }
];

let carts = [];

/* =======================
   OPEN / CLOSE CART
======================= */
iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
});

/* =======================
   SAVE / LOAD CART
======================= */
const addCartToMemory = () => {
  localStorage.setItem('cart', JSON.stringify(carts));
};

const loadCartFromMemory = () => {
  if (localStorage.getItem('cart')) {
    carts = JSON.parse(localStorage.getItem('cart'));
  }
};

/* =======================
   RENDER PRODUCTS
======================= */
const addDataToHTML = () => {
  listProductHTML.innerHTML = '';

  listProduct.forEach(product => {
    let newProduct = document.createElement('div');
    newProduct.classList.add('item');
    newProduct.dataset.id = product.id;

    // Anchor IDs for jumping from slideshow
    if (product.id >= 1 && product.id <= 4) newProduct.id = 'seventeen';
    if (product.id >= 5 && product.id <= 8) newProduct.id = 'twice';
    if (product.id >= 9 && product.id <= 12) newProduct.id = 'lesserafim';

    newProduct.innerHTML = `
      <div class="pro">
        <img src="${product.image}" alt="${product.name}">
        <div class="des">
          <span>Artist / Group</span>
          <h5>${product.name}</h5>
          <h4>₱${product.price}</h4>
          <button class="addCart">
            <i class="fa fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    `;

    listProductHTML.appendChild(newProduct);
  });
};

/* =======================
   CART ACTIONS
======================= */
listProductHTML.addEventListener('click', (event) => {
  if (event.target.closest('.addCart')) {
    let product_id = event.target.closest('.item').dataset.id;
    addToCart(product_id);
  }
});

const addToCart = (product_id) => {
  let index = carts.findIndex(item => item.product_id == product_id);
  if (index === -1) {
    carts.push({ product_id, quantity: 1 });
  } else {
    carts[index].quantity++;
  }
  addCartToHTML();
  addCartToMemory();
};

const addCartToHTML = () => {
  ListCartHTML.innerHTML = '';
  if (carts.length === 0) {
    iconCartSpan.innerText = 0;
    return;
  }

  carts.forEach(cart => {
    let product = listProduct.find(p => p.id == cart.product_id);
    if (!product) return;

    let newCart = document.createElement('div');
    newCart.classList.add('item');
    newCart.dataset.id = cart.product_id;

    newCart.innerHTML = `
      <div class="image">
        <img src="${product.image}" alt="">
      </div>
      <div class="name">${product.name}</div>
      <div class="totalPrice">₱${product.price * cart.quantity}</div>
      <div class="quantity">
        <span class="minus"><</span>
        <span class="count">${cart.quantity}</span>
        <span class="plus">></span>
      </div>
    `;
    ListCartHTML.appendChild(newCart);
  });

  iconCartSpan.innerText = carts.reduce((sum, c) => sum + c.quantity, 0);
};

ListCartHTML.addEventListener('click', (event) => {
  let target = event.target;
  let item = target.closest('.item');
  if (!item) return;
  let product_id = item.dataset.id;

  if (target.classList.contains('plus')) changeQuantity(product_id, 1);
  if (target.classList.contains('minus')) changeQuantity(product_id, -1);
});

const changeQuantity = (product_id, change) => {
  let index = carts.findIndex(item => item.product_id == product_id);
  if (index < 0) return;
  carts[index].quantity += change;
  if (carts[index].quantity <= 0) {
    carts.splice(index, 1);
  }
  addCartToHTML();
  addCartToMemory();
};

/* =======================
   INIT APP
======================= */
const initApp = () => {
  loadCartFromMemory();
  addDataToHTML();
  addCartToHTML();
};

initApp();

/* =======================
   SLIDESHOW (PRESERVED)
======================= */
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlide");
  if (slides.length === 0) return;
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

/* =======================
   BACK TO TOP (PRESERVED)
======================= */
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

(function() {
    // 1. Data Source
    const listProduct = [
        { "id": 1, "name": "SEVENTEEN SCOUPS", "price": 150, "image": "puge.jpg" },
        { "id": 2, "name": "SEVENTEEN MINGYU", "price": 200, "image": "gyu.jpg" },
        { "id": 3, "name": "SEVENTEEN JEONGHAN", "price": 200, "image": "han.jpg" },
        { "id": 4, "name": "SEVENTEEN MINGHAO", "price": 200, "image": "hao.jpg" },
        { "id": 5, "name": "TWICE MOMO", "price": 180, "image": "momo.jpg" },
        { "id": 6, "name": "TWICE NAYEON", "price": 180, "image": "nayeon.jpg" },
        { "id": 7, "name": "TWICE SANA", "price": 200, "image": "sana.jpg" },
        { "id": 8, "name": "TWICE TZUYU", "price": 150, "image": "tzuyu.jpg" },
        { "id": 9, "name": "LESSERAFIM CHAEWON", "price": 150, "image": "chae.jpg" },
        { "id": 10, "name": "LESSERAFIM SAKURA", "price": 150, "image": "kura.jpg" },
        { "id": 11, "name": "LESSERAFIM EUNCHAE", "price": 150, "image": "eunchae.jpg" },
        { "id": 12, "name": "LESSERAFIM KAZUHA", "price": 150, "image": "zuha.jpg" }
    ];

    // 2. Load and Display Checkout Items
    function loadCheckout() {
        const listHTML = document.getElementById('checkoutList');
        const totalHTML = document.getElementById('finalTotal');
        const cartData = localStorage.getItem('cart');
        const carts = cartData ? JSON.parse(cartData) : [];
        
        let total = 0;
        listHTML.innerHTML = ''; // Clear previous content

        if (carts.length === 0) {
            listHTML.innerHTML = '<div class="empty-msg">Your cart is empty!</div>';
            totalHTML.innerText = '₱0';
            return;
        }

        carts.forEach(item => {
            // Find product matching the ID
            const product = listProduct.find(p => p.id == item.product_id);
            
            if (product) {
                const subtotal = product.price * item.quantity;
                total += subtotal;

                const itemDiv = document.createElement('div');
                itemDiv.classList.add('order-item');
                itemDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="item-details">
                        <div class="item-name">${product.name}</div>
                        <div class="item-price">₱${product.price.toLocaleString()} x ${item.quantity}</div>
                    </div>
                    <div class="item-total">₱${subtotal.toLocaleString()}</div>
                `;
                listHTML.appendChild(itemDiv);
            }
        });

        totalHTML.innerText = '₱' + total.toLocaleString();
    }

    // 3. Confirm Order Logic
    window.confirmOrder = function() {
        const carts = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (carts.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        alert('Order Received! Thank you for shopping with WesternPop.');
        localStorage.removeItem('cart');
        window.location.href = 'product.html';
    };

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', loadCheckout);

     const backToTop = document.getElementById("backToTop");



  window.addEventListener("scroll", () => {

    if (window.pageYOffset > 300) {

      backToTop.classList.add("active");

    } else {

      backToTop.classList.remove("active");

    }

  });



  backToTop.addEventListener("click", () => {

    window.scrollTo({ top: 0, behavior: "smooth" });

  });

})(); // End IIFE