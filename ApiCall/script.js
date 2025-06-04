const PRODUCT_URL = "https://fakestoreapi.com/products";
const ImagesContainer = document.querySelector(".ImagesContainer");
//Promise-based approach to fetch products
// const fetchProducts =(url) => {
//     fetch(url)
//     .then((response)=>(response.json()))
//     .then((data)=>{console.log(data)})
//     .catach((error)=>{console.log(error)})
// }
// fetchProducts(PRODUCT_URL)


const fetchProducts = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayProducts(data);
        // Display the fetched products
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
fetchProducts(PRODUCT_URL);
// Async/Await approach to fetch products

const displayProducts = (products) => {
    products.forEach((product) => {
        const {image,category,price} = product;
        const productCard = document.createElement("div");


         productCard.innerHTML = `
        <img src="${image}" alt=> 
            <div>

            <div class=categoryAndPrice>
            <p>${category}</p>
            <span>${price}</span>

        </div>
        </div>
        `;
    
        productCard.classList.add("categoryAndPrice");
        //productCard.style.backgroundColor = "blue"

     ImagesContainer.appendChild(productCard);

      

    })

    // const displayProducts = (products) => {
    // products.forEach((product) => {
    //     const {image,category,price} = product;
    //     const productCard = document.createElement("div");


    //   const value = `
    //     <img src="${image}" alt=> 
    //         <p>${category}</p>
    //         <span>${price}</span>`

    //       ImagesContainer.innerHTML += value; 
}