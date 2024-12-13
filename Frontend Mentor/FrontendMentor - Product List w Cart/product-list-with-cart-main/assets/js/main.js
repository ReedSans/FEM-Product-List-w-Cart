
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector("ul.shopping-cart");
  const dialogBox = document.getElementById('confirmModal')

  // Function to update the dialog with current cart items
  function updateDialog(dialogBox) {
    const checkoutList = dialogBox.querySelector('ul.checkout');
    checkoutList.innerHTML = ''; // Clear the previous dialog content
  
    let total = 0;
    const cartItems = cartContainer.querySelectorAll('.item');
  
    cartItems.forEach(cartItem => {
      const name = cartItem.getAttribute('data-id');
      const count = parseInt(cartItem.querySelector('.text-orange').textContent);
      const price = parseFloat(cartItem.querySelector('.text-light').textContent.replace('@ $', ''));

      // Retrieve the full item data (image, name, etc.)
      const itemData = JSON.parse(cartItem.getAttribute('data-item'));
  
      const dialogItem = document.createElement('li');
      dialogItem.className = 'cart-item';
      dialogItem.innerHTML = `
        <div>
          <div class="image-box">
            <img src="${itemData.image.desktop}" alt="${name}">
          </div>
          <div class="order-info">
            <p class="fs-300 fw-semi-bold">${name}</p>
            <p>
              <span class="text-orange fs-300 fw-bold">${count}x</span>
              <span class="text-light fs-300">@ $${price.toFixed(2)}</span>                  
            </p>
          </div>
        </div>            
        <span class="fs-500 fw-semi-bold">$${(count * price).toFixed(2)}</span>
      `;
      checkoutList.appendChild(dialogItem);
      total += count * price;
    });
  
    // Update total price in dialog
    const totalElement = dialogBox.querySelector('#totalCount');
    totalElement.textContent = `$${total.toFixed(2)}`;
  }

  // Attach event listeners for static elements
  const openSesame = document.querySelector('#open-modal')
  openSesame.addEventListener('click', () => {
    dialogBox.showModal() 
    updateDialog(dialogBox)  // Ensure modal reflects current cart state
  })

  const closeSesame = document.querySelector('#close-modal')
  closeSesame.addEventListener('click', () => dialogBox.close() )

  // Add event delegation for cart item removal
  cartContainer.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('.remove-item svg');
    if (closeBtn) {
      const cartItem = closeBtn.closest('.item');
      const itemName = cartItem.getAttribute('data-id');
      removeFromCart({ name: itemName });
      toggleEmptyCart();
    }
  });

  // Fetch data and initialize buttons
  fetch('../../data.json')
    .then(response => response.json())
    .then(data => {
      const buttons = document.querySelectorAll(".card .btn.add");

      // Loop through buttons and attach event listeners
      buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
          const item = data[index]; // Get corresponding item
          handleAddToCart(button, item);                  
        });
      });
    })
  .catch(error => console.error("Error fetching JSON data:", error));


// 
// //
// // // =-=-=-=-=-FUNCTIONS-=-=-=-=-=-=

  function handleAddToCart(button, item) {
    // Replace "Add to Cart" button with counter button
    const counterContainer = document.createElement("button");
    counterContainer.classList.add("btn", "bg-button", "fw-semi-bold", "text-white", "count", "visible");
    counterContainer.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 10 2" class="deduct"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
      <span>1</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 10 10" class="increase"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
    `;
    button.replaceWith(counterContainer);
    counterContainer.parentElement.children[0].classList.toggle('show')
    counterContainer.parentElement.children[1].classList.toggle('show')
    toggleEmptyCart()

    // Add the item to the cart
    addToCart(item, 1, button, counterContainer);

    

    // Handle increase button
    counterContainer.querySelector(".increase").addEventListener("click", () => {
      const countSpan = counterContainer.querySelector("span");
      let count = parseInt(countSpan.textContent);
      count++;
      countSpan.textContent = count;

      // Update cart count
      updateCartItem(item, count);
      updateTotalPrice()
    });

    // Handle decrease button
    counterContainer.querySelector(".deduct").addEventListener("click", () => {
      const countSpan = counterContainer.querySelector("span");
      let count = parseInt(countSpan.textContent);

      if (count > 1) {
        count--;
        countSpan.textContent = count;

        // Update cart count
        updateTotalPrice();
      } else {
        // Remove the item from cart and toggle back to "Add to Cart"
        counterContainer.replaceWith(button);
        button.parentElement.children[0].classList.toggle('show') 
        button.parentElement.children[1].classList.toggle('show') 
        
        removeFromCart(item);
        toggleEmptyCart()        
      }
      
      updateCartItem(item, count)
      updateTotalPrice();
    });
  }

  function addToCart(item, count) {
    // Check if the item already exists in the cart
    let cartItem = cartContainer.querySelector(`[data-id="${item.name}"]`);

    if (!cartItem) {
      // Create a new cart item
      cartItem = document.createElement("li");
      cartItem.className = "item";
      cartItem.setAttribute("data-id", item.name);
      cartItem.setAttribute("data-item", JSON.stringify(item)); // Store the full item data
      cartItem.innerHTML = `
        <div class="order-info">
          <span class="fs-400 fw-semi-bold">${item.name}</span>
          <p>
            <span class="text-orange fs-300 fw-bold">${count}x</span>
            <span class="text-light fs-300">@ $${item.price.toFixed(2)}</span>
            <span class="text-regular fs-300 fw-bold">$${(item.price * count).toFixed(2)}</span>
          </p>
        </div>
        <span class="remove-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 10 10">
            <path fill="hsl(12, 20%, 44%)" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
          </svg>
        </span>
      `;

      cartContainer.appendChild(cartItem);
    }

    updateCartItem(item, count);
    updateTotalPrice()        
  }

  function updateTotalPrice() {
    const cartItems = cartContainer.querySelectorAll(".item");
    let total = 0;
    cartItems.forEach(cartItem => {
      const priceText = cartItem.querySelector(".text-regular").textContent.replace('$', '');
      total += parseFloat(priceText);
    });
    cartContainer.nextElementSibling.children[0].children[1].textContent = `$${total.toFixed(2)}`;
  } 

  function updateCartItem(item, count) {
    const cartItemsNumber = document.getElementById('updateCartItems')
    cartItemsNumber.textContent = cartContainer.children.length

    const cartItem = cartContainer.querySelector(`[data-id="${item.name}"]`);
    if (cartItem) {
      cartItem.querySelector(".text-orange").textContent = `${count}x`;
      cartItem.querySelector(".text-regular").textContent = `$${(item.price * count).toFixed(2)}`;
    }
  }

  function removeFromCart(item) {
    const cartItem = cartContainer.querySelector(`[data-id="${item.name}"]`);
    
    if (cartItem) {
      cartItem.remove();
    }
    updateTotalPrice();
    
  }

  // function removeFromCart(item) {
  //   const cartItem = cartContainer.querySelector(`[data-id="${item.name}"]`);
    
  //   if (cartItem) {
  //     cartItem.remove();
  //   }
    
  //   // Update the associated button to "Add to Cart"
  //   const cards = document.querySelectorAll(".card"); // Look for all cards
  //   cards.forEach(card => {
  //     const button = card.querySelector(".btn"); // Find the button in each card
  //     const cardName = card.querySelector(".card-title").textContent.trim(); // Get the item's name
      
  //     if (cardName === item.name && button.classList.contains("count")) {
  //       // Create a new "Add to Cart" button
  //       const addToCartButton = document.createElement("button");
  //       addToCartButton.classList.add("btn", "add", "fw-semi-bold", "text-white", "bg-primary");
  //       addToCartButton.textContent = "Add to Cart";
  
  //       // Replace the current button
  //       button.replaceWith(addToCartButton);
  
  //       // Reattach the click event listener to the new button
  //       addToCartButton.addEventListener("click", () => handleAddToCart(addToCartButton, item));
  //     }
  //   });
  
  //   toggleEmptyCart(); // Check if the cart is now empty
  //   updateTotalPrice(); // Update the total price
  // }
  

  function toggleEmptyCart () {
    if (cartContainer.children.length === 0)  {
      const emptyCart = document.querySelector('.empty-cart')
      emptyCart.classList.toggle('hide')
      cartContainer.nextElementSibling.classList.toggle('hide')
    }
  }
});

