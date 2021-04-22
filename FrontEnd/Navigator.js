import { Actions } from 'react-native-router-flux';

export default class Navigator {
    static instance = Navigator.instance || new Navigator()
    _tabHandler = null

    constructor() { }

    set tabHandler(handler) {
        this._tabHandler = handler
    }

    get tabHandler() {
        this._tabHandler
    }

    setTabHandler(handler) {
        this.tabHandler = handler
    }

    goToLogin = () => {
        this._tabHandler('user-tab')
        Actions.login()
    }
    
    goToRegister = () => {
        Actions.register()
    }
    
    goToHome = () => {
        this._tabHandler('home-tab')
        Actions.home()
    }
    
    goToViewBox= (box) => {
        Actions.view_box({ params: box })
    }
    
    goToCart = () => {
        this._tabHandler('cart-tab')
        Actions.cart()
    }
    
    goToInventoryManagement = () => {
        Actions.inventory_management()
    }
    
    goToProductManagement = () => {
        Actions.product_management()
    }
    
    goToEditProduct = (product) => {
        Actions.edit_product({ params: product })
    }
    
    goToBoxManagement = () => {
        Actions.box_management()
    }
    
    goToEditBox = (box) => {
        Actions.edit_box({ params: box })
    }
    
    goToMenu = () => {
        this._tabHandler('menu-tab')
        Actions.menu()
    }
    
    goToEditAccount = () => {
        this._tabHandler('user-tab')
        Actions.edit_account()
    }
    
    goToAdminManagement = () => {
        Actions.admin_management()
    }
    
    goToViewOrders = () => {
        this._tabHandler('orders-tab')
        Actions.view_orders()
    }
    
    goToCheckout = () => {
        Actions.checkout()
    }
    
    goToPayment = () => {
        Actions.payment()
    }
    
    goToEditCart = (box_content) => {
        Actions.edit_cart({ params: box_content })
    }
    
    goToOrderManagement = () => {
        Actions.order_management()
    }
}











// export const goToLogin = () => {
//     Actions.login()
// }

// export const goToRegister = () => {
//     Actions.register()
// }

// export const goToHome = () => {
//     Actions.home()
// }

// export const goToViewBox= (box) => {
//     Actions.view_box({ params: box })
// }

// export const goToCart = () => {
//     Actions.cart()
// }

// export const goToInventoryManagement = () => {
//     Actions.inventory_management()
// }

// export const goToProductManagement = () => {
//     Actions.product_management()
// }

// export const goToEditProduct = (product) => {
//     Actions.edit_product({ params: product })
// }

// export const goToBoxManagement = () => {
//     Actions.box_management()
// }

// export const goToEditBox = (box) => {
//     Actions.edit_box({ params: box })
// }

// export const goToMenu = () => {
//     Actions.menu()
// }

// export const goToEditAccount = () => {
//     Actions.edit_account()
// }

// export const goToAdminManagement = () => {
//     Actions.admin_management()
// }

// export const goToViewOrders = () => {
//     Actions.view_orders()
// }

// export const goToCheckout = () => {
//     Actions.checkout()
// }

// export const goToPayment = () => {
//     Actions.payment()
// }

// export const goToEditCart = (box_content) => {
//     Actions.edit_cart({ params: box_content })
// }

// export const goToOrderManagement = () => {
//     Actions.order_management()
// }