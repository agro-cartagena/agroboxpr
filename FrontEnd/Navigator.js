import { Actions } from 'react-native-router-flux';

export const goToLogin = () => {
    Actions.login()
}

export const goToRegister = () => {
    Actions.register()
}

export const goToHome = () => {
    Actions.home()
}

export const goToViewBox = (box) => {
    Actions.view_box({ params: box })
}

export const goToCart = () => {
    Actions.cart()
}

export const goToInventoryManagement = () => {
    Actions.inventory_management()
}

export const goToProductManagement = () => {
    Actions.product_management()
}

export const goToEditProduct = (product) => {
    Actions.edit_product({ params: product })
}

export const goToBoxManagement = () => {
    Actions.box_management()
}

export const goToEditBox = (box) => {
    Actions.edit_box({ params: box })
}

export const goToMenu = () => {
    Actions.menu()
}

export const goToEditAccount = () => {
    Actions.edit_account()
}

export const goToAdminManagement = () => {
    Actions.admin_management()
}

export const goToViewOrders = () => {
    Actions.view_orders()
}

export const goToCheckout = () => {
    Actions.checkout()
}

export const goToPayment = () => {
    Actions.payment()
}

export const goToEditCart = (box) => {
    Actions.edit_cart({ params: box })
}

export const goToOrderManagement = () => {
    Actions.order_management()
}