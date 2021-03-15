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

export const goToBox = (id, name, uri, price) => {
    Actions.box({
        params: {
            box_id: id,
            box_name: name,
            box_image: uri,
            box_price: price
        }
    })
}