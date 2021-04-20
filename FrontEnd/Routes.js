import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import styles from './styles'

import RegisterScreen from './screens/customer/RegisterScreen/RegisterScreen'
import LoginScreen from './screens/customer/LoginScreen/LoginScreen'
import HomeScreen from './screens/customer/HomeScreen/HomeScreen'

import ViewBoxScreen from './screens/customer/ViewBoxScreen/ViewBoxScreen'
import CartScreen from './screens/customer/CartScreen/CartScreen'
import EditProductScreen from './screens/admin/EditProductScreen/EditProductScreen'
import EditBoxScreen from './screens/admin/EditBoxScreen/EditBoxScreen'

import MenuScreen from './screens/customer/MenuScreen/MenuScreen'
import ManageInventoryScreen from './screens/admin/ManageInventoryScreen/ManageInventoryScreen'
import ManageProductsScreen from './screens/admin/ManageProductsScreen/ManageProductsScreen'
import ManageBoxesScreen from './screens/admin/ManageBoxesScreen/ManageBoxesScreen'

import EditAccountScreen from './screens/customer/EditAccountScreen/EditAccountScreen'
import ManageAdministratorsScreen from './screens/admin/ManageAdministratorsScreen/ManageAdministratorsScreen'
import ViewOrdersScreen from './screens/customer/ViewOrdersScreen/ViewOrdersScreen'

import CheckoutScreen from './screens/customer/CheckoutScreen/CheckoutScreen'
import PaymentScreen from './screens/customer/PaymentScreen/PaymentScreen'
import EditCartScreen from './screens/customer/EditCartScreen/EditCartScreen'

import ManageOrdersScreen from './screens/admin/ManageOrdersScreen/ManageOrdersScreen'

const Routes = () => {
    return(
        <Router sceneStyle={styles.app}>
            <Scene key="root">
                <Scene key="login" component={LoginScreen} title="Login" hideNavBar={true}/>
                <Scene key="register" component={RegisterScreen} title="Register" hideNavBar={true} />
                <Scene key="home" component={HomeScreen} title="Home" hideNavBar={true} initial = {true}/>
                <Scene key="view_box" component={ViewBoxScreen} title="View Box" hideNavBar={true}/>
                <Scene key="cart" component={CartScreen} title="Cart" hideNavBar={true} />
                <Scene key="inventory_management" component={ManageInventoryScreen} title="Inventory Management" hideNavBar={true}/>
                <Scene key="box_management" component={ManageBoxesScreen} title="Box Management" hideNavBar={true}/>
                <Scene key="edit_box" component={EditBoxScreen} title="Edit Box" hideNavBar={true}/>
                <Scene key="product_management" component={ManageProductsScreen} title="Product Management" hideNavBar={true}/>
                <Scene key="edit_product" component={EditProductScreen} title="Edit Product" hideNavBar={true}/>
                <Scene key="menu" component={MenuScreen} title="Menu" hideNavBar={true}/>
                <Scene key="edit_account" component={EditAccountScreen} title="Edit Account" hideNavBar={true}/>
                <Scene key="admin_management" component={ManageAdministratorsScreen} title="Admin Management" hideNavBar={true}/>
                <Scene key="view_orders" component={ViewOrdersScreen} title="View Orders" hideNavBar={true}/>
                <Scene key="checkout" component={CheckoutScreen} title="Checkout" hideNavBar={true}/>
                <Scene key="payment" component={PaymentScreen} title="Payment" hideNavBar={true}/>
                <Scene key="edit_cart" component={EditCartScreen} title="Edit Cart" hideNavBar={true} />
                <Scene key="order_management" component={ManageOrdersScreen} title="Order Management" hideNavBar={true} />
            </Scene>
        </Router>
    )
}

export default Routes;

// For a tutorial on how Routes work, refer to:
// https://www.tutorialspoint.com/react_native/react_native_router.htm