import { Actions } from 'react-native-router-flux';

export default class Navigator {
    static instance = Navigator.instance || new Navigator()
    _tabHandler = null

    constructor() { }

    setTabHandler(handler) {
        this._tabHandler = handler
    }

    goToLogin = (redirect=false) => {
        this._tabHandler('user-tab')
        Actions.login({ params: redirect})
    }
    
    goToRegister = (redirect=false) => {
        this._tabHandler('user-tab')
        Actions.register({ params: redirect})
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
    
    goToCheckout = (order) => {
        Actions.checkout({ params: order })
    }
    
    goToPayment = (order) => {
        Actions.payment({ params: order })
    }
    
    goToEditCart = (box_content) => {
        Actions.edit_cart({ params: box_content })
    }
    
    goToOrderManagement = () => {
        Actions.order_management()
    }

    goToContactUs = () => {
        Actions.contact_us()
    }

    goToOrderConfirmation = () => {
        Actions.order_confirmation()
    }
}