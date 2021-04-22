import React from 'react';
import { View } from 'react-native';

import styles from './TabBarStyleSheet'
import global_styles from '../../styles'
import Tab from '../Tab/Tab'

import Navigator from '../../Navigator'
import UserService from '../../services/UserService'

const TabBar = () => {

    const [activeTab, setActiveTab] = React.useState("home-tab")
    Navigator.instance.setTabHandler(setActiveTab)

    return (
        <View style={[styles.bar, global_styles.container]}>
            <Tab
                defaultIcon={require('../../assets/icons/cart.png')}
                activeIcon={require('../../assets/icons/cart-active.png')}
                isActive={activeTab == "cart-tab"}
                onTouch={() => { if(activeTab != "cart-tab"){ Navigator.instance.goToCart() }}}
            />
    
            <Tab
                defaultIcon={require('../../assets/icons/user-profile.png')}
                activeIcon={require('../../assets/icons/user-profile-active.png')}
                isActive={activeTab == "user-tab"}
                onTouch={() => { 
                    if(activeTab != "user-tab") { 
                        if(UserService.instance.isAuthenticated()) {
                            Navigator.instance.goToEditAccount()
                        } else {
                            Navigator.instance.goToLogin()
                        }
                    }
                }}
            />
    
            <Tab
                defaultIcon={require('../../assets/icons/home.png')}
                activeIcon={require('../../assets/icons/home-active.png')}
                isActive={activeTab == "home-tab"}
                onTouch={() => { if(activeTab != "home-tab"){ Navigator.instance.goToHome() }}}
            />
    
            <Tab
                defaultIcon={require('../../assets/icons/orders.png')}
                activeIcon={require('../../assets/icons/orders-active.png')}
                isActive={activeTab == "orders-tab"}
                onTouch={() => { if(activeTab != "orders-tab"){ Navigator.instance.goToViewOrders() }}}
            />
    
            <Tab
                defaultIcon={require('../../assets/icons/Menu.png')}
                activeIcon={require('../../assets/icons/menu-active.png')}
                isActive={activeTab == "menu-tab"}
                onTouch={() => { if(activeTab != "menu-tab"){ Navigator.instance.goToMenu() }}}
            /> 
        </View>
    )  
}

export default TabBar;