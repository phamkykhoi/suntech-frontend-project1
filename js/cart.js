const CART_KEY = 'cart_key'

class ShoppingCart
{
    constructor() {
        this.products = localStorage.getItem(CART_KEY) ? JSON.parse(localStorage.getItem(CART_KEY)) : []
    }

    all() {
        return this.products
    }

    add(data) {
        this.products.push(data)
        localStorage.setItem(CART_KEY, JSON.stringify(this.products))
    }

    update(id, qty) {
        this.products.forEach((product, index) => {
            if (product.id == id) this.products[index].qty += qty
        })

        localStorage.setItem(CART_KEY, JSON.stringify(this.products))
    }

    delete(id) {
        this.products.forEach((product, index) => {
            if (product.id == id) this.products.splice(index, 1)
        })

        localStorage.setItem(CART_KEY, JSON.stringify(this.products))
    }

    total() {
        let totalProducts = 0

        this.products.forEach(product => {
            totalProducts += product.qty
        })

        return totalProducts
    }

    exists(id) {
        let arrCheck = []

        this.products.forEach(product => {
            if (product.id == id) arrCheck.push(true)
        })

        return arrCheck.length > 0
    }
}