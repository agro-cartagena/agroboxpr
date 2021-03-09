import React from 'react';
import { View } from 'react-native';

import styles from './TabBarStyleSheet'
import global_styles from '../../styles'

import Tab from '../Tab/Tab'
import { goToLogin } from '../../Navigator'

export default class TabBar extends React.Component {
    tabs = [
        <Tab
            key="cart-tab"
            defaultIcon={require('../../assets/icons/cart.png')}
            activeIcon={require('../../assets/icons/cart-active.png')}
            onTouch={(cmp) => this.touchHandler(cmp)}
            active={false}
        />,

        <Tab
            key="user-tab"
            defaultIcon={require('../../assets/icons/user-profile.png')}
            activeIcon={require('../../assets/icons/user-profile-active.png')}
            onTouch={(cmp) => this.touchHandler(cmp)}
            active={false}
        />,

        <Tab
            key="home-tab"
            defaultIcon={require('../../assets/icons/home.png')}
            activeIcon={require('../../assets/icons/home-active.png')}
            onTouch={(cmp) => this.touchHandler(cmp)}
            active={false}
        />,

        <Tab
            key="orders-tab"
            defaultIcon={require('../../assets/icons/orders.png')}
            activeIcon={require('../../assets/icons/orders-active.png')}
            onTouch={(cmp) => this.touchHandler(cmp)}
            active={false}
        />,

        <Tab
            key="menu-tab"
            defaultIcon={require('../../assets/icons/Menu.png')}
            activeIcon={require('../../assets/icons/menu-active.png')}
            onTouch={(cmp) => {this.state.activeTab = cmp; this.state.activeTab.toggle()}}
            active={false}
        />                            
    ]

    constructor() {
        super()

        this.state = {
            activeTab: this.tabs["home-tab"]
        }
        // Activate default tab => 
        //this.state.activeTab.toggle()
        
    }

    touchHandler = (value) => {
        // Deactivate current tab => 
        // this.state.activeTab.toggle()

        // this.setState({
        //     activeTab: value
        // })

        // Activate next tab => 
        // this.state.activeTab.toggle()

        this.state.activeTab.toggle(); 
        this.setState({
            activeTab: value
        })
        // this.state.activeTab = value; 
        value.toggle()
    }

    render() {
        return (
            <View style={[styles.bar, global_styles.container]}>
                {this.tabs}
            </View>
        )
    }
}