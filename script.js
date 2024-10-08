// Student Name: Tom

// Create a user function and go to the login page
function createUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        // Save the user information to localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        
        alert('User created successfully!');
        window.location.href = 'login.html'; // Go to the login page
    } else {
        alert('Please fill in all fields.');
    }
}

// Entry function
function login() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Get the saved user name and password from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Check whether the entered user name and password match
    if (loginUsername === storedUsername && loginPassword === storedPassword) {
        alert('Login successful!');
        window.location.href = 'shop.html'; // After login, go to shop
    } else {
        alert('Login failed! Redirecting to create user page.');
        window.location.href = 'createUser.html'; // Login failed Go to the page for creating a user
    }
}

// Closing function
function checkout() {
    const quantity = document.getElementById('quantity').value;
    const product = document.getElementById('product').value;
    let price;

    if (product === "Course A") {
        price = 100;
    } else if (product === "Course B") {
        price = 200;
    }

    const total = quantity * price;
    document.getElementById('totalOrder').innerText = `Total Order: $${total}`;
}
let cart = [];

// Add the course to your cart
function addToCart(id, name, price) {
    const quantity = document.getElementById('quantity' + id).value;
    
    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex >= 0) {
        // If the item already exists, update the quantity
        cart[existingItemIndex].quantity += parseInt(quantity);
    } else {
        // If the item does not exist, add a new item
        cart.push({ id, name, price, quantity: parseInt(quantity) });
    }
    
    updateCart();
}

// Update shopping cart contents
function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    // Empty cart display
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    
    // Iterate over each item in the cart and display it
    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    // Total renewal price
    cartTotalElement.innerText = `Total: $${total.toFixed(2)}`;
}

// Remove items from shopping cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Empty cart
function clearCart() {
    cart = [];
    updateCart();
}

// Checkout function (simulated here only)
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert(`Your total is $${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}. Thank you for your purchase!`);
        clearCart();
    }
}