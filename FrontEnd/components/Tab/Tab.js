import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import global_styles from '../../styles'
import styles from './TabStyleSheet';

const Tab = (props) => {
    const [active, toggleActive] = React.useState(props.activeTab == props.id)

    const toggle = () => { 
        alert(props.id)
        toggleActive(!active) 
    }

    return (
        <TouchableOpacity style={[
                styles.tab, 
                global_styles.container, 
                active ? styles.activeBorder: styles.defaultBorder
            ]} onPress={toggle}>
        
            <Image
                style={styles.icon}
                source={active ? props.activeIcon : props.defaultIcon}
            />
        </TouchableOpacity>        
    )
}

export default Tab