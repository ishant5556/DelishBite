// ---------------------------
// 🌟 NAVBAR TOGGLE (Mobile Menu)
// ---------------------------
const toggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.nav-links');

if (toggle) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

// ---------------------------
// 🌟 SIGNUP FUNCTIONALITY
// ---------------------------
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('newUsername').value.trim();
    const email = document.getElementById('newEmail').value.trim();
    const password = document.getElementById('newPassword').value.trim();

    if (username && email && password) {
      const user = { username, email, password };
      localStorage.setItem('delishbiteUser', JSON.stringify(user));

      alert('✅ Account created successfully! Please login now.');
      window.location.href = 'login.html';
    } else {
      alert('❌ Please fill in all fields.');
    }
  });
}

// ---------------------------
// 🌟 LOGIN FUNCTIONALITY
// ---------------------------
const loginForm = document.querySelector('.login-form');

if (loginForm && !signupForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const savedUser = JSON.parse(localStorage.getItem('delishbiteUser'));

    if (!savedUser) {
      alert('⚠️ No account found. Please sign up first.');
      return;
    }

    if (username === savedUser.username && password === savedUser.password) {
      alert(`✅ Login successful! Welcome, ${savedUser.username}`);
      localStorage.setItem('loggedInUser', savedUser.username);
      window.location.href = 'index.html';
    } else {
      alert('❌ Incorrect username or password.');
    }
  });
}

// ---------------------------
// 🌟 LOGOUT FUNCTIONALITY
// ---------------------------
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    alert('👋 You have logged out.');
    window.location.href = 'login.html';
  });
}

// ---------------------------
// 🌟 CART FUNCTIONALITY
// ---------------------------

// Add to cart
const cartButtons = document.querySelectorAll(".add-to-cart");

cartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Added to Cart!");
  });
});

// CART PAGE DISPLAY
const cartBody = document.getElementById("cartBody");
const grandTotal = document.getElementById("grandTotal");

if (cartBody) {
  function loadCart() {
    cartBody.innerHTML = "";
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach((item, index) => {
      let row = `
        <tr>
          <td>${item.name}</td>
          <td>₹${item.price}</td>
          <td>${item.qty}</td>
          <td>₹${item.price * item.qty}</td>
          <td><button onclick="removeItem(${index})">❌</button></td>
        </tr>
      `;
      cartBody.innerHTML += row;
      total += item.price * item.qty;
    });

    grandTotal.textContent = "Grand Total: ₹" + total;
  }

  loadCart();

  window.removeItem = function(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  };
}

// ---------------------------
// ✅ PAYMENT POPUP LOGIC (FINAL)
// ---------------------------
const paymentPopup = document.getElementById("paymentPopup");
const placeOrderBtn = document.getElementById("placeOrder");
const confirmPayment = document.getElementById("confirmPayment");
const closePopup = document.getElementById("closePopup");
const upiBox = document.getElementById("upiBox");

// Open payment popup
if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", () => {
    paymentPopup.style.display = "flex";
  });
}

// Close popup
if (closePopup) {
  closePopup.addEventListener("click", () => {
    paymentPopup.style.display = "none";
  });
}

// Show UPI box if selected
document.querySelectorAll('input[name="payment"]').forEach(option => {
  option.addEventListener("change", () => {
    if (option.value === "upi") {
      upiBox.style.display = "block";
    } else {
      upiBox.style.display = "none";
    }
  });
});

// Payment confirmation
if (confirmPayment) {
  confirmPayment.addEventListener("click", () => {
    const selected = document.querySelector('input[name="payment"]:checked');

    if (!selected) {
      alert("Please select a payment method");
      return;
    }

    if (selected.value === "upi") {
      const upiId = document.getElementById("upiId").value.trim();
      if (upiId === "") {
        alert("Please enter your UPI ID");
        return;
      }
    }

    localStorage.removeItem("cart");
    alert("✅ Order placed successfully!");
    window.location.href = "index.html";
  });
}
// ✅ HERO BACKGROUND SLIDESHOW
const hero = document.querySelector(".hero");

if (hero) {
  const images = [
    "images/bg1.jpg",
    "images/bg2.jpg",
    "images/bg3.jpg",
    "images/bg4.jpg"
  ];

  let index = 0;

  function changeBackground() {
    hero.style.backgroundImage = `url('${images[index]}')`;
    index = (index + 1) % images.length;
  }

  changeBackground();
  setInterval(changeBackground, 4000); // change every 4 seconds
}
