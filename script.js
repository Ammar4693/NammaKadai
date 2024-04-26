let products = [];

window.addEventListener('load', () => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
        displayProducts();
    }
});

function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function addProduct(event) {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productLocation = document.getElementById('productLocation').value;
    if (productName && productPrice && productLocation) {
        const product = {
            name: productName,
            price: productPrice,
            location: productLocation
        };
        products.push(product);
        saveProductsToLocalStorage();
        displayProducts();
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productLocation').value = '';
    } else {
        alert('Please fill in all fields');
    }
}

function displayProducts(filteredProducts) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    if (filteredProducts) {
        filteredProducts.forEach((product, index) => {
            productList.innerHTML += `
                <div class="eachList">
                <div class="leftSide">
                    <p>பொருள்: ${product.name}</p>
                    <p>விலை: Rs.${product.price}</p>
                    <p>இடம்: ${product.location}</p>
                </div>
                <div class="rightSide">
                    <button onclick="editProduct(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onclick="deleteProduct(${index})"><i class="fa-solid fa-trash"></i></button>
                </div>
                </div>
            `;
        });
    } else {
        products.forEach((product, index) => {
            productList.innerHTML += `
            <div class="eachList">
            <div class="leftSide">
                <p>பொருள்: ${product.name}</p>
                <p>விலை: Rs.${product.price}</p>
                <p>இடம்: ${product.location}</p>
            </div>
            <div class="rightSide">
                <button onclick="editProduct(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="deleteProduct(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
            </div>
            `;
        });
    }
}

function editProduct(index) {
    const newName = prompt("Enter new name for the product", products[index].name);
    const newPrice = prompt("Enter new price for the product", products[index].price);
    const newLocation = prompt("Enter new location for the product", products[index].location);
    
    if (newName && newPrice && newLocation) {
        products[index] = {
            name: newName,
            price: parseFloat(newPrice),
            location: newLocation
        };
        saveProductsToLocalStorage();
        displayProducts();
    }
}

function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        products.splice(index, 1);
        saveProductsToLocalStorage();
        displayProducts();
    }
}

function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.location.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

document.getElementById('productForm').addEventListener('submit', addProduct);
document.getElementById('searchInput').addEventListener('input', searchProducts);
