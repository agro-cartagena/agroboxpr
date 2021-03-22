import React from 'react';
import { View } from 'react-native';

import styles from './TabBarStyleSheet'
import global_styles from '../../styles'

import Tab from '../Tab/Tab'
import { 
    goToLogin,
    goToHome,
    goToCart, 
    goToInventoryManagement
} from '../../Navigator'

const TabBar = () => {

    const touchHandler = (tab) => {
        alert("Hello World")
        // tabs[activeTab].toggle()
        // setActiveTab(tab.key)
        // tab.toggle()
    }

    let tabs = [
        <Tab
            key="cart-tab"
            defaultIcon={require('../../assets/icons/cart.png')}
            activeIcon={require('../../assets/icons/cart-active.png')}
            onTouch={() => { goToCart() }}
            active={false}
        />,

        <Tab
            key="user-tab"
            defaultIcon={require('../../assets/icons/user-profile.png')}
            activeIcon={require('../../assets/icons/user-profile-active.png')}
            onTouch={() => { goToLogin() }}
            active={true}
        />,

        <Tab
            key="home-tab"
            defaultIcon={require('../../assets/icons/home.png')}
            activeIcon={require('../../assets/icons/home-active.png')}
            onTouch={() => { goToHome() }}
            active={false}
        />,

        <Tab
            key="orders-tab"
            defaultIcon={require('../../assets/icons/orders.png')}
            activeIcon={require('../../assets/icons/orders-active.png')}
            onTouch={touchHandler}
            active={false}
        />,

        <Tab
            key="menu-tab"
            defaultIcon={require('../../assets/icons/Menu.png')}
            activeIcon={require('../../assets/icons/menu-active.png')}
            onTouch={() => { goToInventoryManagement() }}
            active={false}
        />                            
    ]

    const [activeTab, setActiveTab] = React.useState(tabs[2].key)

    return (
        <View style={[styles.bar, global_styles.container]}>
            {tabs}
        </View>
    )
    
}

export default TabBar;