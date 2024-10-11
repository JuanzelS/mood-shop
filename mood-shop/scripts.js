let cart = []; // Initialize cart as an empty array

// Function to add item to the cart
const addItemToCart = (id, price, name) => {
  const item = { id, price, name, qty: 1 };
  cart.push(item);
};

// Function to add quantity to an item in the cart
const addToCart = (id) => {
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    if (id === item.id) {
      item.qty += 1; // Increment quantity
      return; // Exit function once the item is found and updated
    }
  }
};

// Function to remove quantity from an item in the cart
const removeFromCart = (id) => {
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    if (id === item.id) {
      item.qty -= 1; // Decrease quantity
      if (item.qty === 0) {
        cart.splice(i, 1); // Remove item from cart if qty is 0
      }
      return; // Exit function once the item is found and updated
    }
  }
};

// Function to display the cart
const displayCart = () => {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = ''; // Clear current cart items

  cart.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      ${item.name} - $${item.price} x ${item.qty}
      <button class="button-add" data-id="${item.id}">+</button>
      <button class="button-sub" data-id="${item.id}">-</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Optionally, calculate and display total price here
};

// Event listener for click events
document.body.addEventListener('click', (e) => {
  if (e.target.matches('.add-to-cart')) {
    const id = e.target.dataset.id;
    const price = e.target.dataset.price;
    const name = e.target.dataset.name; // Get the name from data attributes
    addItemToCart(id, price, name); // Pass name to the addItemToCart function
    displayCart();
  } else if (e.target.matches('.button-add')) {
    const id = e.target.dataset.id; // Get item id from data attribute
    addToCart(id); // Add to cart
    displayCart(); // Update cart display
  } else if (e.target.matches('.button-sub')) {
    const id = e.target.dataset.id; // Get item id from data attribute
    removeFromCart(id); // Remove from cart
    displayCart(); // Update cart display
  }
});

// Function to load products from JSON file
const loadProducts = async () => {
  const response = await fetch('data/products.json'); // Adjust path if needed
  const products = await response.json();
  // Functionality to dynamically create product elements
};

// Load products when the page loads
window.onload = () => {
  loadProducts();
};
document.body.addEventListener('keydown', (e) => {
	if (e.target.matches('.input-qty')) {
	  if (e.key === "Enter") {
		console.log(e.key)
		const name = e.target.dataset.id
		// Use parseInt !
		const value = parseInt(e.target.value)
		updateCart(name, value)
		console.log(e)
		displayCart()
	  }
	}
  })
  
