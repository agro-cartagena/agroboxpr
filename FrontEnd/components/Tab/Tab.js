import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import global_styles from '../../styles'
import styles from './TabStyleSheet';

const Tab = (props) => {
    return (
        <TouchableOpacity style={[
                styles.tab, 
                global_styles.container, 
                props.isActive ? styles.activeBorder: styles.defaultBorder
            ]} onPress={props.onTouch}>
        
            <Image
                style={styles.icon}
                source={props.isActive ? props.activeIcon : props.defaultIcon}
            />
        </TouchableOpacity>        
    )
}

export default Tab