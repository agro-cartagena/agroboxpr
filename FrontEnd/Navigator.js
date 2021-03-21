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

export const goToProduct = (product) => {
    Actions.product({ params: product })
}