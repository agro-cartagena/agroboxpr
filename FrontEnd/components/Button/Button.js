import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

import styles from './ButtonStyleSheet'
import global_styles from '../../styles'

const Button = (props) => {
    return (
        <TouchableOpacity 
            onPress={props.onTouch} 
            style={[styles.button, global_styles.shadow]}
        >
                <Text style={global_styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default Button