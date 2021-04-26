const cart = []

export const addToCart = (item) => {
    cart.push(item)
}

export const removeFromCart = (target_item) => {
    setCart(cart.filter((item) => item._id == target_item._id))
}

export default cart