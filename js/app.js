let shoppingCart   = new ShoppingCart
let btnAddToCartEl = document.querySelectorAll('a.add-to-cart')
let cartTotalProductEl = document.querySelector('#cart-total-product')
let alertMessageEl = document.querySelector('.alert-message')

function renderProducts() {
    let cartProductListEl = document.querySelector('.cart-product-list')
    let products = shoppingCart.all()
    let content  = '';

    if (products.length === 0) {
        content = '<li>Products is empty</li>'
    } else {
        products.forEach(product => {
            content += `<li>
                ${product.name}
                <small>Qty: ${product.qty} | Price: $${product.price} | <button onclick="deleteProduct(${product.id})">Delete</button></small>
            </li>`
        })
    }

    cartProductListEl.innerHTML = content
}

function deleteProduct(id) {
    shoppingCart.delete(id)
    cartTotalProductEl.innerHTML = shoppingCart.total()
    renderProducts()
}

function backToTop() {
   window.scrollTo(0, 0);
}

cartTotalProductEl.innerHTML = shoppingCart.total()

renderProducts()

Array.from(btnAddToCartEl).forEach(elAddToCart => {
    elAddToCart.addEventListener('click', () => {
        let qty = 1

        let product = {
            id: elAddToCart.getAttribute('data-id'),
            name: elAddToCart.getAttribute('data-name'),
            price: elAddToCart.getAttribute('data-price'),
        }

        if (shoppingCart.exists(product.id)) {
            shoppingCart.update(product.id, qty)
            cartTotalProductEl.innerHTML = shoppingCart.total()
            renderProducts()
            return
        }

        product.qty = qty

        shoppingCart.add(product)
        cartTotalProductEl.innerHTML = shoppingCart.total()
        renderProducts()
        backToTop()

        alertMessageEl.style.display = 'block'

        setTimeout(function() {
            alertMessageEl.style.display = 'none'
        }, 1000);
    })
})
