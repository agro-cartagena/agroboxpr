import React, { useState } from 'react';
import { View, Image } from 'react-native';

import global_styles from '../../styles'
import styles from './TabStyleSheet';

export default class Tab extends React.Component {
    icons = {};
    action; // Function

    constructor (props) {
        super(props);

        this.state = {
            active: props.active
        };

        this.action = props.onTouch;
    }

    toggle = () => {
        this.setState({
            active: !this.state.active
        })
    }

    render() {
        return(
            <View style={[
                    styles.tab, 
                    global_styles.container, 
                    this.state.active ? styles.activeBorder: styles.defaultBorder
                ]} onTouchEnd={()=> this.props.onTouch(this)}>
                
                <Image
                    style={styles.icon}
                    source={this.state.active ? this.props.activeIcon : this.props.defaultIcon}
                />
            </View>
        )
    }
}