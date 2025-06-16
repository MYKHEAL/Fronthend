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
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, phoneNumber, password })
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(error => {
          throw new Error("Server error: " + error);
        });
      }
      return response.json();
    })
    .then(data => {
      alert(data.message || "Registered successfully!");
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
    });
}


function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  fetch("http://localhost:8080/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(error => {
          throw new Error("Login error: " + error);
        });
      }
      return response.json();
    })
    .then(data => {
      alert(data.message || "Login successful!");
    })
    .catch(error => {
      console.error("Login error:", error);
      alert("An error occurred: " + error.message);
    });
}
