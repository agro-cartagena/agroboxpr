import React from 'react';
import { View, Image } from 'react-native';

import styles from './TabBarStyleSheet'
import global_styles from '../../styles'

import Tab from '../Tab/Tab'

export default class TabBar extends React.Component {
    tabs = [
        <Tab
            defaultIcon={require('../../assets/icons/cart.png')}
            activeIcon={require('../../assets/icons/cart-active.png')}
            active={false}
            key="cart-tab"
            // onTouch={() => alert("Toggled Cart")}
        />,

        <Tab
            defaultIcon={require('../../assets/icons/user-profile.png')}
            activeIcon={require('../../assets/icons/user-profile-active.png')}
            // onTouch={() => alert("Toggled Profile")}
            active={false}
            key="user-tab"
        />,

        <Tab
            defaultIcon={require('../../assets/icons/home.png')}
            activeIcon={require('../../assets/icons/home-active.png')}
            // onTouch={() => alert("Toggled Home")}
            active={false}
            key="home-tab"
        />,

        <Tab
            defaultIcon={require('../../assets/icons/orders.png')}
            activeIcon={require('../../assets/icons/orders-active.png')}
            // onTouch={() => alert("Toggled Orders")}
            active={false}
            key="orders-tab"
        />,

        <Tab
            defaultIcon={require('../../assets/icons/Menu.png')}
            activeIcon={require('../../assets/icons/menu-active.png')}
            // onTouch={() => alert("Toggled Menu")}
            active={false}
            key="menu-tab"
        />                            
    ]

    render() {
        return (
            <View style={[styles.bar, global_styles.container]}>
                {this.tabs}
            </View>
        )
    }
}