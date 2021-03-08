import React, { useState } from 'react';
import { View, Image } from 'react-native';

import global_styles from '../../styles'
import styles from './TabStyleSheet';

export default class Tab extends React.Component {
    icons = {};
    action; // Function

    constructor (props) {
        super();

        this.state = {
            active: props.active
        };

        this.icons["default"] = props.defaultIcon;
        this.icons["active"] = props.activeIcon;

        this.action = props.onTouch;
    }

    toggle = () => {
        this.setState({
            active: !this.state.active
        })

        if(!this.state.active) {
            // increase top border width of tab
            // this.action();
        }
        else {

            //decrease top border width 
        }
    }

    render() {
        return(
            <View style={[
                    styles.tab, 
                    global_styles.container, 
                    this.state.active ? styles.activeBorder: styles.defaultBorder
                ]} onTouchEnd={this.toggle}>
                
                <Image
                    style={styles.icon}
                    source={this.state.active ? this.icons["active"] : this.icons["default"]}
                />
            </View>
        )
    }
}