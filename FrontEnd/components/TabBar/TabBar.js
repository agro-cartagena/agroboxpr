import React from 'react';
import { View } from 'react-native';

import styles from './TabBarStyleSheet'
import global_styles from '../../styles'
import Tab from '../Tab/Tab'

import { 
    goToLogin, goToHome,
    goToCart, goToInventoryManagement, goToMenu
} from '../../Navigator'

const TabBar = () => {

    const touchHandler = (tab) => {
        // alert("Hello World")
    }

    const [activeTab, setActiveTab] = React.useState("home-tab")

    return (
        <View style={[styles.bar, global_styles.container]}>
            <Tab
                defaultIcon={require('../../assets/icons/cart.png')}
                activeIcon={require('../../assets/icons/cart-active.png')}
                isActive={activeTab == "cart-tab"}
                onTouch={() => { if(activeTab != "cart-tab"){ setActiveTab("cart-tab"); goToCart() }}}
            />
    
            <Tab
                defaultIcon={require('../../assets/icons/user-profile.png')}
                activeIcon={require('../../assets/icons/user-profile-active.png')}
                isActive={activeTab == "user-tab"}
                onTouch={() => { if(activeTab != "user-tab"){ setActiveTab("user-tab"); goToLogin() }}}
            />
    
            <Tab
                defaultIcon={require('../../assets/icons/home.png')}
                activeIcon={require('../../assets/icons/home-active.png')}
                isActive={activeTab == "home-tab"}
                onTouch={() => { if(activeTab != "home-tab"){ setActiveTab("home-tab"); goToHome() }}}
            />
    
            <Tab
                defaultIcon={require('../../assets/icons/orders.png')}
                activeIcon={require('../../assets/icons/orders-active.png')}
                isActive={activeTab == "orders-tab"}
                onTouch={() => { if(activeTab != "orders-tab"){ setActiveTab("orders-tab"); touchHandler() }}}
            />
    
            <Tab
                defaultIcon={require('../../assets/icons/Menu.png')}
                activeIcon={require('../../assets/icons/menu-active.png')}
                isActive={activeTab == "menu-tab"}
                onTouch={() => { if(activeTab != "menu-tab"){ setActiveTab("menu-tab"); goToMenu() }}}
            /> 
        </View>
    )  
}

export default TabBar;