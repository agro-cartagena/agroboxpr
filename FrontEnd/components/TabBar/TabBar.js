import React from 'react';
import { View } from 'react-native';

import styles from './TabBarStyleSheet'
import global_styles from '../../styles'
import Tab from '../Tab/Tab'

import { 
    goToLogin, goToHome,
    goToCart, goToInventoryManagement
} from '../../Navigator'

const TabBar = () => {

    const touchHandler = (tab) => {
        // alert("Hello World")

    }

    const [activeTab, setActiveTab] = React.useState("home-tab")

    return (
        <View style={[styles.bar, global_styles.container]}>
            <Tab
                id="cart-tab"
                defaultIcon={require('../../assets/icons/cart.png')}
                activeIcon={require('../../assets/icons/cart-active.png')}
                onTouch={() => { goToCart() }}
                activeTab={activeTab}
                activeTabHandler={setActiveTab}
            />
    
            <Tab
                id="user-tab"
                defaultIcon={require('../../assets/icons/user-profile.png')}
                activeIcon={require('../../assets/icons/user-profile-active.png')}
                onTouch={() => { goToLogin() }}
                activeTab={activeTab}
                activeTabHandler={setActiveTab}
            />
    
            <Tab
                id="home-tab"
                defaultIcon={require('../../assets/icons/home.png')}
                activeIcon={require('../../assets/icons/home-active.png')}
                onTouch={() => { goToHome() }}
                activeTab={activeTab}
                activeTabHandler={setActiveTab}
            />
    
            <Tab
                id="orders-tab"
                defaultIcon={require('../../assets/icons/orders.png')}
                activeIcon={require('../../assets/icons/orders-active.png')}
                onTouch={() => { touchHandler() }}
                activeTab={activeTab}
                activeTabHandler={setActiveTab}
            />
    
            <Tab
                id="menu-tab"
                defaultIcon={require('../../assets/icons/Menu.png')}
                activeIcon={require('../../assets/icons/menu-active.png')}
                onTouch={() => { goToInventoryManagement() }}
                activeTab={activeTab}
                activeTabHandler={setActiveTab}
            /> 
        </View>
    )
    
}

export default TabBar;