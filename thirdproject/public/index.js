// Side navbar
var para = document.querySelector(".side-navbar");

function shownavbar() {
    para.style.left = "0";
}

function shownavbarclose() {
    para.style.left = "-60%";
}

// Search bar
var form = document.getElementById("six");
var cards = document.querySelectorAll(".food-title");

form.addEventListener("keyup", function(event) {
    var enteredValue = event.target.value.toUpperCase();

    cards.forEach(function(card) {
        var productName = card.textContent.toUpperCase();
        var parentCard = card.closest('.food-box');

        if (productName.indexOf(enteredValue) < 0) {
            parentCard.style.display = "none";
        } else {
            parentCard.style.display = "block";
        }
    });
});

// Card and card items
var para1 = document.querySelector(".cart");

function showcard() {
    para1.style.right = "0";
}

function closecard() {
    para1.style.right = "-100%";
}

// Cart and cart items
const btnCart = document.querySelector('.card-icon .fa-shopping-cart');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('.cart-close .fa-x');

btnCart.addEventListener('click', () => {
    cart.classList.add('cart-active');
});

btnClose.addEventListener('click', () => {
    cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded', loadFood);

function loadFood() {
    loadContent();
}

function loadContent() {
    // Remove Food Items From Cart
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn) => {
        btn.addEventListener('click', removeItem);
    });

    // Product Item Change Event
    let qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input) => {
        input.addEventListener('change', changeQty);
    });

    // Product Cart
    let cartBtns = document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn) => {
        btn.addEventListener('click', addCart);
    });

    updateTotal();
}

// Remove Item
function removeItem() {
    if (confirm('Are You Sure to Remove')) {
        let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList = itemList.filter(el => el.title != title);
        this.parentElement.remove();
        loadContent();
    }
}

// Change Quantity
function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    loadContent();
}

let itemList = [];

// Add Cart
function addCart() {
    let food = this.parentElement;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgSrc = food.querySelector('.food-img').src;

    let newProduct = { title, price, imgSrc };

    // Check if Product already exists in Cart
    if (itemList.find((el) => el.title == newProduct.title)) {
        alert("Product Already added in Cart");
        return;
    } else {
        itemList.push(newProduct);
    }

    let newProductElement = createCartProduct(title, price, imgSrc);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;
    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element);
    loadContent();
}

function createCartProduct(title, price, imgSrc) {
    return `
    <div class="cart-box">
      <img src="${imgSrc}" class="cart-img">
      <div class="detail-box">
        <div class="cart-food-title">${title}</div>
        <div class="price-box">
          <div class="cart-price">${price}</div>
          <div class="cart-amt">${price}</div>
        </div>
        <input type="number" value="1" class="cart-quantity">
      </div>
      <ion-icon name="trash" class="cart-remove"></ion-icon>
    </div>
    `;
}

function updateTotal() {
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');

    let total = 0;

    cartItems.forEach(product => {
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
        let qty = product.querySelector('.cart-quantity').value;
        total += (price * qty);
        product.querySelector('.cart-amt').innerText = "Rs." + (price * qty);
    });

    totalValue.innerHTML = 'Rs.' + total.toFixed(2); // Ensure total is formatted with 2 decimal places

    // Add Product Count in Cart Icon
    const cartCount = document.querySelector('.number');
    let count = itemList.length;
    cartCount.innerHTML = count;

    if (count == 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'block';
    }
}

// Collections
const imgs = document.querySelectorAll('.img a');
let imgId = 1;

const imgDiv = document.querySelectorAll('.img');

imgs.forEach((img) => {
    img.addEventListener('click', (e) => {
        e.preventDefault();
        imgId = img.dataset.id;

        imgDiv.forEach((img) => {
            img.classList.remove('active');
        });

        img.parentElement.classList.add('active');

        moveImage();
    });
});

function moveImage() {
    const imgWidth = document.querySelector('.main-image img:first-child').clientWidth;
    let width = (imgId - 1) * imgWidth;
    document.querySelector('.main-image').style.transform = `translateX(${-width}px)`;
}

const minusBtn = document.querySelector('.minus');
const plusBtn = document.querySelector('.plus');
const qtyTxt = document.querySelector('#qty');

minusBtn.addEventListener('click', () => {
    let qty = parseInt(qtyTxt.value);
    if (qty > 0) {
        qty--;
        qtyTxt.value = qty;
    }
});

plusBtn.addEventListener('click', () => {
    let qty = parseInt(qtyTxt.value);
    if (qty >= 0 && qty < 5) {
        qty++;
        qtyTxt.value = qty;
    }
});

function updateTotal() {
    const cardItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');
    var total = 0;
    cardItems.forEach(product => {
        var priceElement = product.querySelector('.cart-price');
        var price = parseFloat(priceElement.innerHTML.replace("$", ""));
        var qty = product.querySelector('.cart-quantity').value;
        total += (price * qty);
        product.querySelector('.cart-amt').innerText = "$" + (price * qty);
    });
    totalValue.innerHTML = '$' + total.toFixed(2); // Ensure total is formatted with 2 decimal places

    //Add Product Count in Cart Icon
    const cartCount=document.querySelector('.number')
    var count=itemList.length;
    cartCount.innerHTML=count;

    if(count==0){
        cartCount.style.display='none'
    }else{
        cartCount.style.display='block'
    }
}

