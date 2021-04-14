import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import styles from './styles'

import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import HomeScreen from './screens/HomeScreen/HomeScreen'

import ViewBoxScreen from './screens/ViewBoxScreen/ViewBoxScreen'
import CartScreen from './screens/CartScreen/CartScreen'
import CheckoutScreen from './screens/CheckoutScreen/CheckoutScreen'
import EditProductScreen from './screens/EditProductScreen/EditProductScreen'
import EditBoxScreen from './screens/EditBoxScreen/EditBoxScreen'
import PaymentScreen from './screens/PaymentScreen/PaymentScreen'

import MenuScreen from './screens/MenuScreen/MenuScreen'
import InventoryManagementScreen from './screens/InventoryManagementScreen/InventoryManagementScreen'
import ProductManagementScreen from './screens/ProductManagementScreen/ProductManagementScreen'
import BoxManagementScreen from './screens/BoxManagementScreen/BoxManagementScreen'

import EditAccountScreen from './screens/EditAccountScreen/EditAccountScreen'

const Routes = () => {
    return(
        <Router sceneStyle={styles.app}>
            <Scene key="root">
                <Scene key="login" component={LoginScreen} title="Login" hideNavBar={true}/>
                <Scene key="register" component={RegisterScreen} title="Register" hideNavBar={true} />
                <Scene key="home" component={HomeScreen} title="Home" hideNavBar={true}/>
                <Scene key="view_box" component={ViewBoxScreen} title="View Box" hideNavBar={true}/>
                <Scene key="cart" component={CartScreen} title="Cart" hideNavBar={true}/>
                <Scene key="checkout" component={CheckoutScreen} title="Checkout" hideNavBar={true} />
                <Scene key="payment" component={PaymentScreen} title="Payment" hideNavBar={true} initial={true}/>
                <Scene key="inventory_management" component={InventoryManagementScreen} title="Inventory Management" hideNavBar={true}/>
                <Scene key="box_management" component={BoxManagementScreen} title="Box Management" hideNavBar={true}/>
                <Scene key="edit_box" component={EditBoxScreen} title="Edit Box" hideNavBar={true}/>
                <Scene key="product_management" component={ProductManagementScreen} title="Product Management" hideNavBar={true}/>
                <Scene key="edit_product" component={EditProductScreen} title="Edit Product" hideNavBar={true}/>
                <Scene key="menu" component={MenuScreen} title="Menu" hideNavBar={true}/>
                <Scene key="edit_account" component={EditAccountScreen} title="Edit Account" hideNavBar={true}/>
            </Scene>
        </Router>
    )
}

export default Routes;

// For a tutorial on how Routes work, refer to:
// https://www.tutorialspoint.com/react_native/react_native_router.htm