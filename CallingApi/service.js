const PRODUCT_URL = "https://dummyjson.com/products";
const ImagesContainer = document.querySelector(".ImagesContainer");

const fetchProducts = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayProducts(data.products);
        // Display the fetched products
        console.log(data.products);
    } catch (error) {
        console.error(error);
    }
}
fetchProducts(PRODUCT_URL);

const displayProducts = (products) => {
    products.forEach((product) => {
        const {thumbnail, category, price} = product;
        const productCard = document.createElement("div");

        productCard.innerHTML = `
            <img src="${thumbnail}" alt="" >
            <div>
                <div class="categoryAndPrice">
                    <p>${category}</p>
                    <span >${price}</span>
                </div>
            </div>
        `;

        productCard.classList.add("productCard");
     
        ImagesContainer.appendChild(productCard);
    });
}


const searchBar = document.querySelector(".searchContainer input");
searchBar.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const productCards = document.querySelectorAll(".productCard");

    productCards.forEach((card) => {
        const category = card.querySelector("p").textContent.toLowerCase();
        if (category.includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});