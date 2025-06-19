window.addEventListener("DOMContentLoaded", () => {
  const loggedIn = localStorage.getItem("isLoggedIn");
  if (loggedIn === "true") {
    showHomePage();
  }
});

let currentForm = "register";

function toggleFormToggle() {
  if (currentForm === "register") {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.querySelector(".toggle").innerText = "Switch to Register";
    document.getElementById("form-title").innerText = "Login";
    currentForm = "login";
  } else {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
    document.querySelector(".toggle").innerText = "Switch to Login";
    document.getElementById("form-title").innerText = "Register";
    currentForm = "register";
  }
}

function register() {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const phoneNumber = document.getElementById("reg-phoneNumber").value;
  const password = document.getElementById("reg-password").value;

  fetch("http://localhost:8080/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phoneNumber, password })
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUserId", data.id);
      localStorage.setItem("userEmail", data.email);
      alert("Registered successfully!");
      showHomePage();
    })
    .catch(error => {
      alert("Registration failed: " + error.message);
    });
}

function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  fetch("http://localhost:8080/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUserId", data.id);
      localStorage.setItem("userEmail", data.email);
      alert("Login successful!");
      showHomePage();
    })
    .catch(error => {
      alert("Login failed: " + error.message);
    });
}

function logout() {
  localStorage.clear();
  document.getElementById("home-page").style.display = "none";
  document.querySelector(".access-container").style.display = "flex";
}

function showHomePage() {
  document.querySelector(".access-container").style.display = "none";
  document.getElementById("home-page").style.display = "block";
  fetchAndDisplayArtworks();
}

function fetchAndDisplayArtworks() {
  fetch("http://localhost:8080/api/artworks")
    .then(res => res.json())
    .then(displayArtworks)
    .catch(() => {
      document.getElementById("art-list").innerHTML = "<p>Unable to load artworks.</p>";
    });
}

function displayArtworks(artworks) {
  const artList = document.getElementById("art-list");
  artList.innerHTML = "";

  if (!artworks || artworks.length === 0) {
    artList.innerHTML = "<p>No artworks found.</p>";
    return;
  }

  artworks.forEach(art => {
    const card = document.createElement("div");
    card.className = "art-card";
    card.innerHTML = `
      <img src="${art.imageUrl}" alt="${art.title}" />
      <div class="info">
        <h3>${art.title}</h3>
        <p>${art.description}</p>
        <p><strong>₦${art.price}</strong></p>
        <p>By: ${art.artistName}</p>
        <button onclick="viewDetails('${art.id}', ${art.price})">View Details</button>
      </div>
    `;
    artList.appendChild(card);
  });
}

function showSection(section) {
  document.getElementById("home-section").style.display = "none";
  document.getElementById("create-section").style.display = "none";
  document.getElementById("details-section").style.display = "none";

  document.getElementById(`${section}-section`).style.display = "block";
}

let selectedArtworkId = "";
let selectedArtworkPrice = 0;

function viewDetails(artId, price) {
  selectedArtworkId = artId;
  selectedArtworkPrice = price;

  fetch(`http://localhost:8080/api/artworks/${artId}`)
    .then(response => response.json())
    .then(art => {
      const details = document.getElementById("artwork-details");
      details.innerHTML = `
        <h3>${art.title}</h3>
        <img src="${art.imageUrl}" alt="${art.title}" />
        <p><strong>Description:</strong> ${art.description}</p>
        <p><strong>Category:</strong> ${art.category}</p>
        <p><strong>Price:</strong> ₦${art.price}</p>
        <p><strong>Artist:</strong> ${art.artistName}</p>
        <p><strong>Available:</strong> ${art.available ? "Yes" : "No"}</p>
      `;

      document.getElementById("order-payment").value = art.price;
      document.getElementById("order-form").style.display = "block";
      showSection("details");
    });
}

function placeOrder() {
  if (!localStorage.getItem("isLoggedIn")) {
    alert("You must be logged in to place an order.");
    return;
  }

  const payment = document.getElementById("order-payment").value;
  if (!payment || parseFloat(payment) < selectedArtworkPrice) {
    alert(`Insufficient payment. Artwork costs ₦${selectedArtworkPrice}`);
    return;
  }

  const orderData = {
    artworkId: selectedArtworkId,
    buyer: localStorage.getItem("loggedInUserId"),
    payment: parseFloat(payment)
  };

  fetch("http://localhost:8080/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  })
    .then(response => {
      if (!response.ok) return response.text().then(text => { throw new Error(text); });
      return response.json();
    })
    .then(data => {
      alert("Order placed successfully!");
      document.getElementById("order-form").style.display = "none";
      showSection("home");
    })
    .catch(error => {
      alert("Error placing order: " + error.message);
    });
}
