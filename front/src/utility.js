

export function addToCart(id, name, price) {
    let cart = getCart()

    if (cart[id]) { //existing item
        let item = cart[id]
        item.quantity += 1
    } else { //item does not exist yet
        let item = {
            id: id,
            name: name,
            price: price,
            quantity: 1,
        }

        cart[id] = item
    }

    localStorage.setItem("cart", JSON.stringify(cart))

    return cart
}

export function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"))

    if (!cart) { //no existing cart
        cart = {}
    }

    return cart
}

export function removeFromCart(id) {
    let cart = getCart()
    let keys = Object.keys(cart)

    let newCart = {}
    for (const key of keys) {
        if (key === id) { //skip, aka remove
            continue;
        }

        newCart[key] = cart[key] //otherwise, keep
    }
    
    localStorage.setItem("cart", JSON.stringify(newCart))

    return newCart
}