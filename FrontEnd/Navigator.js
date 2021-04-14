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

export const goToCheckout = () => {
    Actions.checkout()
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