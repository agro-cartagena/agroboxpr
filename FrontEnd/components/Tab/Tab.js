import React from 'react';
import { View, Image } from 'react-native';

import global_styles from '../../styles'
import styles from './TabStyleSheet';

const Tab = (props) => {
    const [active, toggleActive] = React.useState(props.active)

    const toggle = () => {
        toggleActive(!active)
    }

    return (
        <View style={[
                styles.tab, 
                global_styles.container, 
                active ? styles.activeBorder: styles.defaultBorder
            ]} onTouchEnd={toggle}>
        
            <Image
                style={styles.icon}
                source={active ? props.activeIcon : props.defaultIcon}
            />
        </View>        
    )
}

export default Tab