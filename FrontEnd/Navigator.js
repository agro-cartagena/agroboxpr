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

export const goToUserInfo = (id, name, email, phone, address, city, zipcode) => {
    Actions.user({
        params: {
            user_id: id,
            user_name: name,
            user_email: email,
            user_phone: phone,
            user_address: address,
            user_city: city,
            user_zipcode: zipcode
        }
    })
}
