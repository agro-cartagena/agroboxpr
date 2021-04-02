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
