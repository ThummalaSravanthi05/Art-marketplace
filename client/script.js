const API = "http://localhost:5000/api/auth";

// REGISTER
async function register() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    document.getElementById("msg").innerText = data.message;

    if (data.message === "Account created successfully") {
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    }
}

// LOGIN
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    document.getElementById("msg").innerText = data.message;

    if (data.message === "Login success") {
        localStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    }
}

let arts = JSON.parse(localStorage.getItem("arts")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function showPage(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(page).classList.add("active");

    if (page === "gallery") loadArts();
    if (page === "profile") loadProfile();
}

// ADD ART
function addArt() {
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    const user = JSON.parse(localStorage.getItem("user"));

    const art = {
        title,
        price,
        image,
        owner: user.email
    };

    arts.push(art);
    localStorage.setItem("arts", JSON.stringify(arts));

    alert("Art added!");
    loadProfile();
}

// LOAD GALLERY
function loadArts() {
    const container = document.getElementById("products");
    container.innerHTML = "";

    if (arts.length === 0) {
        container.innerHTML = "<p>No arts uploaded yet</p>";
        return;
    }

    arts.forEach((art, index) => {
        container.innerHTML += `
        <div class="card">
            <img src="${art.image}">
            <h4>${art.title}</h4>
            <p>₹${art.price}</p>
            <button onclick="addToCart(${index})">Add to Cart</button>
        </div>
        `;
    });
}

// ADD TO CART
function addToCart(index) {
    cart.push(arts[index]);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

// PROFILE DATA
function loadProfile() {
    const user = JSON.parse(localStorage.getItem("user"));

    const myArtsDiv = document.getElementById("myArts");
    myArtsDiv.innerHTML = "";

    const myArts = arts.filter(a => a.owner === user.email);

    myArts.forEach(art => {
        myArtsDiv.innerHTML += `
        <div class="card">
            <img src="${art.image}">
            <p>${art.title}</p>
        </div>`;
    });
}