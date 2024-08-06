
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

export function formatString(string) {
    if (typeof string !== "string") {
        return ""
    }

    while (string.includes("-")) {
        string = string.replace("-", " ")
    }

    //capitalize any characters after spaces
    let arr = string.split(" ")
    let idx = 0

    for (let sub of arr) {
        let char = sub.charAt(0)
        let upper = char.toUpperCase()
        sub = sub.replace(char, upper)
        arr[idx] = sub
        idx += 1
    }

    string = arr.join(" ")

    return string
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

export function randomListItem(list) {

    if (!list) {
        return undefined
    }

    let int = Math.floor(Math.random() * list.length);
    let item = list[int]

    list.splice(int, 1) //remove from the array so it's not repeated

    return item
}