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

export const goToBox = (box) => {
    Actions.box({ params: box })
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

export const goToProduct = (product) => {
    Actions.product({ params: product })
}

export const goToBoxManagement = () => {
    Actions.box_management()
}